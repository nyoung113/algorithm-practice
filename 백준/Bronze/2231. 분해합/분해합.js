const input = Number(require('fs')
    .readFileSync('/dev/stdin')
    .toString()
    .trim())


function solution(N){

    for(let i = 1; i < N; i++){
        if( N === getDecompositionSum(i)){
            return i;
        }
    }
    function getDecompositionSum(n){
        return n + n.toString().split('').map(Number).reduce((acc, cur) => acc + cur);
    }
    return 0;
}

console.log(solution(input))