let input =  require('fs')
    .readFileSync('/dev/stdin')
    .toString()
    .trim()
    .split(`\n`)

const [N, M] = input.shift().split(' ').map(Number)

const graph = input.map((line) => line.split(' ').map(Number));

const awds = [[-1, 0], [0, -1], [1, 0], [0, 1]]

let startX = -1;
let startY = -1;


const result = new Array(N).fill(0).map(() => new Array(M).fill(Infinity));

for(let i = 0; i < N; i++){
    for(let j = 0; j < M; j++){
        if(graph[i][j] === 2){
            startX = i;
            startY = j;
        }
        if(graph[i][j] === 0){
            result[i][j] = 0;
        }
    }
}


const queue = [];
queue.push([startX, startY]);
result[startX][startY] = 0;


while(queue.length){
    const [curX, curY] = queue.shift();
    const dist = result[curX][curY];

    awds.forEach(([addX, addY]) => {
        const nextX = curX + addX >= 0 && curX + addX < N ? curX + addX : -1;
        const nextY = curY + addY >= 0 && curY + addY < M ? curY + addY : -1;

        if(nextX === -1 || nextY === -1){
            return;
        }

        if(graph[nextX][nextY] === 1
            && result[nextX][nextY] === Infinity)
        {
            result[nextX][nextY] = dist + 1;
            queue.push([nextX, nextY])
        }
    })

}

for(let i = 0; i < N; i++){
    console.log(result[i].map(v => v === Infinity ? -1 : v).join(' '));
}