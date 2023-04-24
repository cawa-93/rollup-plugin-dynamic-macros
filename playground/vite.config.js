import CreateMacros from '../plugin.js'
import {defineConfig} from 'vite'
export default defineConfig({
    build: {
        lib: {
            entry: './main.js',
            name: 'demoLib',
            formats: ['es'],
        },
        minify: false
    },
    plugins: [
        CreateMacros({
            macros: {
                defineNumberMacros: (min, max) => Math.round(min - 0.5 + Math.random() * (max - min + 1)),
                defineStringMacros: () => btoa(Math.random().toString()),
                defineBooleanMacros: () => Math.random() > 0.5
            }
        })
    ]
})
