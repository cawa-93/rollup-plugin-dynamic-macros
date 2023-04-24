import {walk} from 'estree-walker'
import MagicString from 'magic-string'

export default function (config = {}) {
    const macrosKeys = Object.keys(config.macros || {})

    /**
     * @param {string} code
     * @returns {boolean}
     */
    const hasMacro = (code) => macrosKeys.some(k => code.includes(k))
    const getArgValue = node => {
        switch (node.type) {
            case 'Literal' : return node.value
            case 'ArrayExpression' : return node.elements.map(getArgValue)
            case 'ObjectExpression' : return Object.fromEntries(node.properties.map(prop => [prop.key.name, getArgValue(prop.value)]))
        }
    }

    return {
        name: 'macros',

        transform(code, id) {
            if (!hasMacro(code)) {
                return;
            }
            // Get vue SFC script
            const {
                0: script = code,
                index: codeIndex = 0
            } = code.match(/(?<=<script[^>]*>)[\S\s.]*?(?=<\/script>)/) || {index: 0, 0: code}
            console.log({id, script})

            const s = new MagicString(script)

            walk(this.parse(script, {
                sourceType: 'module',
                ecmaVersion: 'latest'
            }), {
                enter(node) {
                    if (node.type !== 'CallExpression' || node.callee.type !== 'Identifier' || !macrosKeys.includes(node.callee.name)) {
                        return
                    }
                    // noinspection JSAnnotator
                    const macrosVal = JSON.stringify(config.macros[node.callee.name](...node.arguments.map(getArgValue)))
                    s.update(codeIndex + node.start, codeIndex + node.end, macrosVal)
                }
            })

            if (s.hasChanged()) {
                return {
                    code: s.toString(),
                    map: s.generateMap()
                }
            }
        }
    }
}
