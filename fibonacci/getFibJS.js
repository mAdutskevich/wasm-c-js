export default function getFibJS(n) {
    if (n === 1) return 1;
    if (n === 2) return 1;
    return getFibJS(n - 1) + getFibJS(n - 2);
}
