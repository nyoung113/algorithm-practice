const input = require('fs')
    .readFileSync('/dev/stdin')
    .toString()
    .split('\n')


const [ _, n] = input[0].split(' ').map(Number)
const numbers = input[1].split(' ').map(Number);

 console.log(solution(n, numbers, 3));

 function solution(n, numbers, cnt) {

     let result = -1;
     combination([], numbers,0, cnt);
     return result;

     function combination(arr, rest, idx, cnt){
         if(cnt === 0) {
             const total = arr.reduce((acc, cur) => acc + cur)

             if(result < total && total <= n) result = total;
             return;
         }
         cnt -= 1;
         for(let i = idx; i < rest.length; i++){
             combination([...arr, rest[i]], rest.filter((_ , idx) => idx !== i), i, cnt)
         }
     }
 }
