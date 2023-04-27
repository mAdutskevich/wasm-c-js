import loadMath from './math.js';

const wasm_module = await loadMath();

console.log('Wasm add: 2 + 3 = ', wasm_module._add(2, 3));
console.log('Wasm substract: 9 - 2 = ', wasm_module._substract(9, 2));
