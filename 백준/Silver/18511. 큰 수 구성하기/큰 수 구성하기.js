function getMultiLineInputWithSpaceToNumberArray(){
    return require('fs')
        .readFileSync('/dev/stdin')
        .toString()
        .split('\n')
        .map((line) => line.trim()
            .split(' ')
            .map(Number)
        )
}

const input = getMultiLineInputWithSpaceToNumberArray()

const [ N, _ ] = input[0]
const elements = input[1];

const target = N.toString();
let result = [];

function permutation(arr){
    if(arr.length >= target.length){
        result.push([...arr]);
        return;
    }
    elements.forEach((e) =>
        {
            permutation([...arr, e]);
        }
    )
}
permutation([]);

result = result.map((item) => item
    .reduce((acc, cur) => acc.toString() + cur.toString()))
    .map(Number)

const max = Number(Math.min(...elements).toString().repeat(target.length + 1));
const min = Number(Math.max(...elements).toString().repeat(target.length - 1));

result.push(min);
result.push(max);
result.sort((a, b) => a - b)


const idx = result.findIndex(
    (item, idx, arr) => {
        return item > N
})

console.log(result[idx - 1]);