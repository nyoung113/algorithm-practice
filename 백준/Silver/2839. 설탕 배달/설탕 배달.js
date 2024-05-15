const input = +require('fs').readFileSync('/dev/stdin').toString().trim()

const DP = new Array(input + 1).fill(Infinity)

DP[3] = 1;
DP[5] = 1;

for(let i = 6; i <= input; i++){
    DP[i] = Math.min(DP[i - 3], DP[i - 5]) + 1
}

if(DP[input] === Infinity){
    console.log(-1)
}else{
    console.log(DP[input]);
}
