const input = require('fs')
    .readFileSync('/dev/stdin')
    .toString()
    .trim()
    .split('\n')
    .map(Number)

input.forEach((item) => {
    const result = makeLine(item);
    console.log(result);
})

function makeLine (n) {
    if(n === 0) return "-"
    return makeLine(n - 1) + " ".repeat(Math.pow(3, n - 1)) + makeLine(n - 1)
}
