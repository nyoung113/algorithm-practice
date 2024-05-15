const input = +require('fs').readFileSync('/dev/stdin').toString().trim()

const DP = new Array(input + 1).fill(0);

DP[1] = 0;
DP[2] = 1;
DP[3] = 1;

for(let i = 4; i < DP.length; i++){
    const pot = [];
    if(i % 3 === 0) {
        pot.push(DP[i / 3]);
    }
    if(i % 2 === 0){
        pot.push(DP[i / 2])
    }
    pot.push(DP[i - 1]);
    DP[i] = Math.min(...pot) + 1;
}
console.log(DP[input]);