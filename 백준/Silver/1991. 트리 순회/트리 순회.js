// ---핵심 개념 ---
// 트리 순회, 트리 순회는 === dfs
// --- 문제 설명 ---
// --- 생각 과정 ---
// --- 시간 복잡도  ---


const input = require('fs')
    .readFileSync('/dev/stdin')
    .toString()
    .trim()
    .split('\n')

const N = +input.shift()

// 항상 A가 루트 노드가 됨

const graph = input.map((line) => line.split(' '))

const gMap = new Map();

for(let i = 0; i <graph.length; i++){
    gMap.set(graph[i][0], {
        left : graph[i][1],
        right : graph[i][2]
    });
}

let result = [];
preorder('A')
console.log(result.join(''))
 result = [];
inorder('A')
console.log(result.join(''))
 result = [];
postorder('A')
console.log(result.join(''))


function preorder(cur) {
    if(cur === '.'){
        return;
    }

    const {left} = gMap.get(cur);
    const {right} = gMap.get(cur);

    result.push(cur);
    preorder(left);
    preorder(right);
}
function inorder(cur) {
    if(cur === '.'){
        return;
    }

    const {left} = gMap.get(cur);
    const {right} = gMap.get(cur);

    inorder(left);
    result.push(cur);
    inorder(right);
}

function postorder(cur) {
    if(cur === '.'){
        return;
    }

    const {left} = gMap.get(cur);
    const {right} = gMap.get(cur);

    postorder(left);
    postorder(right);
    result.push(cur);
}