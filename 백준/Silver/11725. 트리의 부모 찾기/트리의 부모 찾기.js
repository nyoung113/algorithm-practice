let input = require('fs')
    .readFileSync('/dev/stdin')
    .toString().trim().split('\n')

const N = +input.shift();

// const graph = new Array(N + 1).fill([]) 는 안됨
const graph = new Array(N + 1).fill(0).map(() => [])

input = input.map((v) => v.split(' ').map(Number))

for(let [x, y] of input) {
    graph[x].push(y);
    graph[y].push(x);
}

// 방문 여부 array
const visited = new Array(N + 1).fill(false);
// 자신의 부모를 담는 array(결과값)
const result = new Array(N + 1).fill(0);

const queue = [];

// 초기 시작은 1로 설정 (루트 노드가 1)
queue.push(1);
visited[1] = true;

while(queue.length){
    const cur = queue.shift();
    graph[cur].forEach((node, idx) => {
        if(!visited[node]){
            visited[node] = true;
            result[node] = cur;
            queue.push(node);
        }
    })
}
console.log(result.slice(2).reduce((acc, cur) => acc + '\n' + cur));
