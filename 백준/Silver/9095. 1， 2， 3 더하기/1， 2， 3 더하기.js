input = require('fs').readFileSync('/dev/stdin')
    .toString()
    .trim()
    .split('\n')
    .map(Number)

const DP = new Array(11).fill(0);
DP[1] = 1;
DP[2] = 2;
DP[3] = 4;

for(let i = 4; i < 11; i++){
    DP[i] = DP[i - 1] + DP[i - 2] + DP[i - 3]
}

const result = [];
for(let i = 1; i < input.length; i++){
result.push(DP[input[i]]);
}
console.log(result.join('\n'));