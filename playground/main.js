import {c, d} from './child.js'
const a = defineStringMacros();
const b = defineBooleanMacros();

console.log({a,b,c, d}, [a,b,c].every(s => s===a))
