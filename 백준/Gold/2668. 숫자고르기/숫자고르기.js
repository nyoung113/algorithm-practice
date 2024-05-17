const input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n')

const len = +input.shift()


const numbers = input.map(Number)

const graph = new Array(len + 1).fill(0).map(() => [])

for(let i = 0; i < numbers.length; i++){
    graph[i + 1].push(numbers[i]);
}

const answer = [];

for(let i = 1; i <= len; i++){
    const visited = new Array(len + 1).fill(false);

    const result = [];
    const stack = [i];

    while(stack.length){
        const cur = stack.pop()
        result.push(cur)

        graph[cur].forEach((nextNode) => {
            if(!visited[nextNode]){
                visited[nextNode] = true;
                stack.push(nextNode)
            }
        })
    }

    if(result[0] === result[result.length - 1]){
        answer.push(...result)
    }
}

const s = [...new Set(answer)].sort((a, b) => a - b);

console.log(s.length);
console.log(s.join('\n'));