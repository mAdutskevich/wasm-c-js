import loadMath from './math.js';
const wasm_module = await loadMath();

console.log(wasm_module._add(2,3));
console.log(wasm_module._substract(8,2));
