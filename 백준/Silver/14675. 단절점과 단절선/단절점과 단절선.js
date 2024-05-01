const input = require('fs').readFileSync('/dev/stdin')
    .toString()
    .trim()
    .split('\n')

const N = +input[0]
const firstInput = input.slice(1, N).map((v) => v.split(' ').map(Number));

let graph = new Array(N + 1).fill(0).map(() => [])
for(let [first, second] of firstInput){
   graph[first].push(second)
    graph[second].push(first)
}


const q = input[N];
const secondInput = input.slice(N + 1).map((v) => v.split(' ').map(Number))

for(let [t, k] of secondInput){
    // k가 단절점인가?
    if(t === 1){
        if(graph[k].length === 1){
            console.log('no');
        }else{
            console.log('yes');
        }
    }
    // k번째 간선이 단절선인가?
    if(t === 2){
        console.log('yes')
    }
}
