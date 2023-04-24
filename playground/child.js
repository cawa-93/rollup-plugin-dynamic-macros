export const c = defineNumberMacros(1, 5)
export const c2 = defineNumberMacros(2, 110)
const a = () => c2
const b = a()
console.log(b)
export * from './sub-child.js'
