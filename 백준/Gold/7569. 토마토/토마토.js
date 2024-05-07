const input = require('fs')
    .readFileSync('/dev/stdin')
    .toString()
    .trim()
    .split('\n')

const [M, N, H] = input.shift().split(' ').map(Number)

let direction = [
    [-1, 0, 0],
    [1, 0, 0],
    [0, -1, 0],
    [0, 1, 0],
    [0, 0, 1],
    [0, 0, -1],
];

const graph = input.map((line) => line.split(' ').map(Number))
const tomato = [];

for(let i = 0; i < H; i++){
    tomato.push(graph.slice(i * N, (i + 1) * N))
}



const queue = [];

let zeroCnt = 0;

for(let i  = 0; i < H; i++){
    for(let j = 0; j < N; j++){
        for(let k = 0; k < M; k++){
            if(tomato[i][j][k] === 1){
                queue.push([i, j, k]);
            }
            if(tomato[i][j][k] === 0){
                zeroCnt += 1;
            }
        }
    }
}
if(zeroCnt === 0){
    console.log(0);
    return;
}

let idx = 0;

while(queue.length > idx){
    const [curX, curY, curZ] = queue[idx];
    const cost = tomato[curX][curY][curZ];

    direction.forEach(([addX, addY, addZ]) => {
        const nextX = curX + addX >= 0 && curX + addX < H ? curX + addX : -1;
        const nextY = curY + addY >= 0 && curY + addY < N ? curY + addY : -1;
        const nextZ = curZ + addZ >= 0 && curZ + addZ < M ? curZ + addZ : -1;

        if(nextX === -1 || nextY === -1 || nextZ === -1){
            return;
        }

        if(tomato[nextX][nextY][nextZ] === 0){
            tomato[nextX][nextY][nextZ] = cost + 1;
            queue.push([nextX, nextY, nextZ]);
        }
    })
    idx += 1;
}


const set = new Set(tomato.flat(2));

if(set.has(0)){
    console.log(-1);
    return;
}

console.log(Math.max(...set) - 1);



