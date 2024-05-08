const input = require('fs')
    .readFileSync('/dev/stdin')
    .toString()
    .trim()
    .split('\n')

const [N, L, R] = input.shift().split(' ').map(Number)


// 인구 이동

// 인구 차이가 L명 이상, R명 이하라면, 국경선을 연다.
// 연합을 이루고 있는 각 칸의 인구수는 (연합의 인구수) / 연합 칸 - 소수점 버림
// 인구 수를 똑같이 분배한다.


const graph = input.map((line) => line.split(' ').map(Number))

const direction = [[0, -1], [-1, 0], [1, 0], [0, 1]]


let cnt = 0;


let prevGraph = JSON.stringify(graph);
while(true){

    // 회차 별 초기화
    const visited = new Array(N).fill(false).map(() => new Array(N).fill(false))

    for(let i = 0; i < N; i++){
        for(let j = 0; j < N; j++){

            if(visited[i][j]){
                continue;
            }

            const stack = [];
            const m = [];


            // startNode
            stack.push([i, j]);
            visited[i][j] = true;

            while(stack.length){
                const [curX, curY] = stack.pop();

                m.push([curX, curY]);

                const curPopulation = graph[curX][curY];



                direction.forEach(([addX, addY]) => {
                    const nextX = curX + addX >= 0 && curX + addX < N ? curX + addX : -1;
                    const nextY = curY + addY >= 0 && curY + addY < N ? curY + addY : -1;

                    if(nextX === -1 || nextY === -1){
                        return;
                    }
                    const diff = Math.abs(curPopulation - graph[nextX][nextY]);

                    if( L <= diff && diff <= R && !visited[nextX][nextY]){
                        visited[nextX][nextY] = true;
                        stack.push([nextX, nextY]);
                    }
                })
            }


            const total = Math.floor(m.map(([x, y]) => graph[x][y]).reduce((acc, cur) => acc + cur) / m.length)


            m.forEach(([x, y]) => {
                graph[x][y] = total;
            })



        }
    }


    if(prevGraph === JSON.stringify(graph)){
        break;
    }

    prevGraph = JSON.stringify(graph);
    cnt += 1;

}

console.log(cnt)
