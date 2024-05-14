const input = +require('fs').readFileSync('/dev/stdin').toString().trim()

const DP =  new Array(input + 1).fill(BigInt(0));

DP[1] = BigInt(1);
DP[2] = BigInt(3);

for(let i = 3; i <= input; i++){
    DP[i] = DP[i - 1] + (DP[i - 2] * BigInt(2))
}
console.log((DP[input] % BigInt(10007)).toString());