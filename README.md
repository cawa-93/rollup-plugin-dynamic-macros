# Dynamic macros

A minimalist Rollup and Vite plugin for creating compile-time macros. 

## How it works
The work of the plugin is very similar to [`define`](https://vitejs.dev/config/shared-options.html#define). You define a pure function that returns some value. At compile time, each call to your function in the code will be evaluated and the inline value will be added to the assembly.

## Usage
```js
// source.js
const randomNum1 = randomNumMacro()
const randomNum2 = randomNumMacro()
```
```js
// vite.config.js
import DynamicMacros from 'vite-plugin-dynamic-macros'

defineConfig({
    plugins: [
        DynamicMacros({
            macros: {
                randomNumMacro: () => Math.random()
            }
        })
    ]
})
```
```js
// compiled.js
const randomNum1 = 0.051910135154368486
const randomNum2 = 0.3576022563333674
```
You also can pass arguments into macro function.

## TypeScript
For TypeScript support you can easily define global functions.
```ts
// globals.d.ts
declare function randomNumMacro() : number
```
