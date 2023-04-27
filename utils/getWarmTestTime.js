export const getWarmTestTime = (fn, arg, loop) => {
    fn(arg); //warm up
    fn(arg); //warm up
    fn(arg); //warm up
    const start = performance.now();
    for (var i = 0; i < loop; i++) {
        fn(arg);
    }
    const end = performance.now();

    return ((end - start) / loop).toFixed(4);
};
