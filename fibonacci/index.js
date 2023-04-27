import getFib from './getFib.js';
import getFibJS from './getFibJS.js';
import {
    getColdTestTime,
    getWarmTestTime,
    getRatio,
} from '../../utils/index.js';

const getFibWasmModule = await getFib();

const numberIndexCold = 35;
const wasmButton = document.getElementById('wasm-button');
const wasmResultEl = document.getElementById('wasm-result');
const jsButton = document.getElementById('js-button');
const jsResultEl = document.getElementById('js-result');
const ratioEl = document.getElementById('ratio');
let wasmColdTime = null;
let jsColdTime = null;

console.log(
    'functions are equal:',
    getFibWasmModule._getFib(numberIndexCold) == getFibJS(numberIndexCold)
);

wasmButton.addEventListener('click', () => {
    wasmColdTime = getColdTestTime(getFibWasmModule._getFib, numberIndexCold);
    wasmResultEl.innerText = wasmColdTime;

    ratioEl.innerText = getRatio(wasmColdTime, jsColdTime);
});

jsButton.addEventListener('click', () => {
    jsColdTime = getColdTestTime(getFibJS, numberIndexCold);
    jsResultEl.innerText = jsColdTime;

    ratioEl.innerText = getRatio(wasmColdTime, jsColdTime);
});

const numberIndexWarm = 35;
const loop = 10;
const wasmButtonWarm = document.getElementById('wasm-button-warm');
const wasmResultWarmEl = document.getElementById('wasm-result-warm');
const jsButtonWarm = document.getElementById('js-button-warm');
const jsResultWarmEl = document.getElementById('js-result-warm');
const ratioElWarm = document.getElementById('ratio-warm');
let wasmWarmTime = null;
let jsWarmTime = null;

wasmButtonWarm.addEventListener('click', () => {
    wasmWarmTime = getWarmTestTime(
        getFibWasmModule._getFib,
        numberIndexWarm,
        loop
    );
    wasmResultWarmEl.innerText = wasmWarmTime;

    ratioElWarm.innerText = getRatio(wasmWarmTime, jsWarmTime);
});

jsButtonWarm.addEventListener('click', () => {
    jsWarmTime = getWarmTestTime(getFibJS, numberIndexWarm, loop);
    jsResultWarmEl.innerText = jsWarmTime;

    ratioElWarm.innerText = getRatio(wasmWarmTime, jsWarmTime);
});
