import getImageGrayscale from './getImageGrayscale.js';
import getImageGrayscaleJs from './getImageGrayscaleJs.js';
import { getColdTestTime, getWarmTestTime, getRatio } from '../../utils/index.js';

const imageGrayscaleWasmModule = await getImageGrayscale();

const wasmGetImageGrayscale = (array, width, height) => {
    const pointer = imageGrayscaleWasmModule._malloc(array.length);
    console.log('pointer', pointer);
    const offset = pointer;
    imageGrayscaleWasmModule.HEAPU8.set(array, offset);
    imageGrayscaleWasmModule._getImageGrayscale(pointer, width, height);

    console.log('array', array);
    const newArray = imageGrayscaleWasmModule.HEAPU8.subarray(offset, offset + array.length);
    console.log('newArray', newArray);

    copyArray(newArray, array);
    // array.set(
    //     imageGrayscaleWasmModule.HEAPU8.subarray(offset, offset + array.length)
    // );
    imageGrayscaleWasmModule._free(pointer);
};

// function wsImageGrayscale(array, width, height) {
//     var pointer = module._malloc(array.length);
//     var offset = pointer;
//     module.HEAPU8.set(array, offset);
//     functions.imageGrayscale(pointer, width, height);
//     array.set(module.HEAPU8.subarray(offset, offset + array.length));
//     module._free(pointer);
// }

function copyArray(src, res) {
    console.log('src', src);
    console.log('res', res);
    for (var i = 0, il = src.length; i < il; i++) {
        res[i] = src[i];
    }
}

const originalImgBlock = document.getElementById('original-image-block');
const originalImgEl = document.getElementById('original-image');
const naturalImgWidth = originalImgEl.naturalWidth;
const naturalImgHeight = originalImgEl.naturalWidth;
const width = originalImgEl.width;
const height = originalImgEl.height;

const canvas = document.createElement('canvas');
canvas.width = width;
canvas.height = height;

const context = canvas.getContext('2d');
context.drawImage(originalImgEl, 0, 0, width, height);

const imageData = context.getImageData(0, 0, width, height);

const wasmCanvas = document.getElementById('wasm-canvas');
wasmCanvas.width = width;
wasmCanvas.height = height;

const wasmContext = wasmCanvas.getContext('2d');
const wasmImageData = wasmContext.getImageData(0, 0, width, height);

const jsCanvas = document.getElementById('js-canvas');
jsCanvas.width = width;
jsCanvas.height = height;

const jsContext = jsCanvas.getContext('2d');
const jsImageData = jsContext.getImageData(0, 0, width, height);

const array0 = imageData.data;
const array1 = wasmImageData.data;
const array2 = jsImageData.data;

// copyArray(array0, array1);
// copyArray(array0, array2);

const wasmButton = document.getElementById('wasm-button');
const wasmResultEl = document.getElementById('wasm-result');
const jsButton = document.getElementById('js-button');
const jsResultEl = document.getElementById('js-result');
const ratioEl = document.getElementById('ratio');
let wasmColdTime = null;
let jsColdTime = null;

// console.log(
//     'functions are equal:',
//     getFibWasmModule._getFib(numberIndexCold) == getFibJS(numberIndexCold)
// );

wasmButton.addEventListener('click', () => {
    copyArray(array0, array1);
    wasmGetImageGrayscale(array1, width, height);
    wasmContext.putImageData(wasmImageData, 0, 0);

    wasmColdTime = getColdTestTime(wasmGetImageGrayscale, array1, width, height);
    wasmResultEl.innerText = wasmColdTime;

    ratioEl.innerText = getRatio(wasmColdTime, jsColdTime);
});

jsButton.addEventListener('click', () => {
    console.log('click');
    copyArray(array0, array2);
    getImageGrayscaleJs(array2, width, height)
    jsContext.putImageData(jsImageData, 0, 0);

    jsColdTime = getColdTestTime(getImageGrayscaleJs, array2, width, height);
    jsResultEl.innerText = jsColdTime;

    ratioEl.innerText = getRatio(wasmColdTime, jsColdTime);
});

// const numberIndexWarm = 35;
// const loop = 10;
// const wasmButtonWarm = document.getElementById('wasm-button-warm');
// const wasmResultWarmEl = document.getElementById('wasm-result-warm');
// const jsButtonWarm = document.getElementById('js-button-warm');
// const jsResultWarmEl = document.getElementById('js-result-warm');
// const ratioElWarm = document.getElementById('ratio-warm');
// let wasmWarmTime = null;
// let jsWarmTime = null;

// wasmButtonWarm.addEventListener('click', () => {
//     wasmWarmTime = getWarmTestTime(
//         getFibWasmModule._getFib,
//         numberIndexWarm,
//         loop
//     );
//     wasmResultWarmEl.innerText = wasmWarmTime;

//     ratioElWarm.innerText = getRatio(wasmWarmTime, jsWarmTime);
// });

// jsButtonWarm.addEventListener('click', () => {
//     jsWarmTime = getWarmTestTime(getFibJS, numberIndexWarm, loop);
//     jsResultWarmEl.innerText = jsWarmTime;

//     ratioElWarm.innerText = getRatio(wasmWarmTime, jsWarmTime);
// });
