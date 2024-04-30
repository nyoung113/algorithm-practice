// 첫째 줄에 정점의 개수 N(1 ≤ N ≤ 1,000), 간선의 개수 M(1 ≤ M ≤ 10,000), 탐색을 시작할 정점의 번호 V
input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');

const [N, M, V] = input.shift().split(' ').map(Number)


let graph = new Array(N + 1).fill(0).map(() => []);

for(let i = 0; i < M; i ++){
    const [first, second] = input[i].split(' ').map(Number);
    graph[first].push(second)
    graph[second].push(first)
}

graph = graph.map((nodes) => nodes.sort((a, b) => a - b))


const dfsResult = dfs(graph, V);
const bfsResult = bfs(graph, V);

console.log(dfsResult.toString().replaceAll(',', ' '));
console.log(bfsResult.toString().replaceAll(',', ' '));

function dfs(graph, V){
    const visited = new Array(N + 1).fill(false)
    visited[V] = true;
    const result = [];

    recursive(V);
    function recursive(sNode){
        result.push(sNode)
        if(graph[sNode].length === 0){
            return;
        }

        graph[sNode].forEach((node) => {
            if(!visited[node]){
                visited[node] = true;
                recursive(node)
            }
        });
    }
    return result;
}

function bfs(graph, V){

    const queue = [];
    const visited = new Array(N + 1).fill(false)
    const result = [];

    queue.push(V);
    visited[V] = true;

    while(queue.length){
       const sNode = queue.shift();
        result.push(sNode);
       graph[sNode].forEach((node) => {
           if(!visited[node]){
               visited[node] = true;
               queue.push(node);
           }
       })
    }
    return result;
}