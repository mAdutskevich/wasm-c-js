export const getColdTestTime = (fn, ...args) => {
    const start = performance.now();
    fn(args);
    const end = performance.now();

    return (end - start).toFixed(9);
};