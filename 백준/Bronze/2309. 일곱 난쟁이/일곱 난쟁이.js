const input = require('fs')
    .readFileSync('/dev/stdin')
    .toString().trim()
    .split('\n')
    .map(Number)

const diff = input.reduce((acc, cur )=> acc + cur) - 100;



const c = [];

function combination(selected, rest){
    if(selected.length === 2){
       const sum = selected.reduce((acc, cur)=> acc + cur)
        if(sum === diff){
            c.push(selected);
        }
        return;
    }
    rest.forEach((cur, idx, arr) => {
        const nextRest = arr.slice(idx + 1)
        combination([...selected, cur], nextRest)
    })
}

combination([], [...input]);

const result = input.filter((v) => v !== c[0][0] && v !== c[0][1])
result.sort((a, b) => a - b)

console.log(result.join('\n'))
