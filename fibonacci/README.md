## Performance test Fibonacci C+Wasm Vs Js 

#### Run the command below inside the folder to compile C function to Wasm

emcc getFib.c -o getFib.js -s EXPORT_ES6=1 -s MODULARIZE=1 -s EXPORT_NAME=getFib -O3 -s EXPORTED_FUNCTIONS="['_getFib']"

#### You should see two files generated by that command: .js and .wasm. The first is a JavaScript file containing the runtime support to load and execute it. The second is a WebAssembly file containing the compiled code.

#### Run index.html in LiveServer or analog to avoid CORS
