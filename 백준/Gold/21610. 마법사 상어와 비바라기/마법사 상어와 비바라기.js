// N * N 격자
// r, c => x, y
// A[r][c] => 물의 양
// 1번 행 => N번 행 연결  1 2 3.. N 1
// 1번 열 => N번 열 연결

// 비바라기 시전
// (N, 1), (N, 2), (N - 1, 1), (N - 1, 2) 구름 생김


// 이동 M번 (d, s)
// 이동 시 동작
// 1. 모든 구름이 d방향으로 s칸 이동한다. (1, 2, 3, 4, ... 8) 까지의 방향 존재
// 2. 각 구름에서 비가 내려 구름이 있는 칸의 바구니에 저장된 물의 양이 1증가한다.

// 2에서 증가한 칸(r, c)에 물복사 마법 시전
// 대각선 방향으로 거리가 1인 칸에 물이 있는 바구니의 수 만큼
// (r, c) 바구니의 물이 양이 증가한다.
// 이때는 이동과 다르게 경계를 넘어가는 칸은 대각선 방향으로 거리가 1인 칸이 아니다.
// 바구니에 저장된 물의 양이 2 이상인 모든 칸에 구름이 생기고, 물의 양이 2 줄어든다.
// 이때 구름이 생기는 칸은 3에서 구름이 사라진 칸이 아니어야 한다.


let input = require('fs')
    .readFileSync('/dev/stdin')
    .toString()
    .trim()
    .split('\n')

// console.log(input);

const [N, M] = input.shift().split(' ').map(Number);
input = input.map((line) => line.split(' ').map(Number));

let buckets = input.slice(0, N);
const movement = input.slice(N);

// 방향과 x, y축 헷갈리지 말자ㅠ
const direction = [null, [0, -1], [-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1]];
const diagonal = [[-1, 1], [1, 1], [1, -1], [-1, -1]];

// 비바라기 시전 하면,
// (N, 1), (N, 2), (N - 1, 1), (N - 1, 2) 구름 생김
//=> 왼쪽 아래에 4칸


// 이동 M번 (d, s)
// 이동 시 동작
// 1. 모든 구름이 d방향으로 s칸 이동한다. (1, 2, 3, 4, ... 8) 까지의 방향 존재
// 2. 각 구름에서 비가 내려 구름이 있는 칸의 바구니에 저장된 물의 양이 1증가한다.

// 실제 index는 -1 해줘야 함,
 let clouds = [[N - 1, 0], [N - 1, 1], [N -2, 0], [N - 2, 1]];

// 1방향으로 3칸 이동한다
for(let [d, s] of movement){
    // console.log(`${d} 방향으로 ${s}만큼`);
    const addX = (direction[d][0] * s) % N;
    const addY = (direction[d][1] * s) % N;
    // console.log(addX, addY);

     clouds = clouds.map(([x, y]) => {
        let newX = x + addX;
        if(newX < 0){
            newX = N + (newX);
        }else if(newX > N - 1){
            newX = newX - N;
        }else {}
        let newY = y + addY;
        if(newY < 0){
            newY = N + (newY);
        }else if(newY > N - 1){
            newY = newY - N;
        }else {}

        return [newX, newY];
    });


     // 2번
    let visited = Array.from({ length: N }, () => Array(N).fill(false));
    clouds.forEach(([x, y]) => {
        buckets[x][y] += 1;
        visited[x][y] = true;
    })

    // console.log(buckets);

    // 2에서 증가한 칸(r, c)에 물복사 마법 시전
// 대각선 방향으로 거리가 1인 칸에 물이 있는 바구니의 수 만큼
// (r, c) 바구니의 물이 양이 증가한다.

// 이때는 이동과 다르게 경계를 넘어가는 칸은 대각선 방향으로 거리가 1인 칸이 아니다.
// 바구니에 저장된 물의 양이 2 이상인 모든 칸에 구름이 생기고, 물의 양이 2 줄어든다.
// 이때 구름이 생기는 칸은 3에서 구름이 사라진 칸이 아니어야 한다.

    let newBuckets = [... buckets];

    clouds.forEach(([r, c]) => {
        let cnt = 0;
        for(let [addR, addC] of diagonal){
            const targetR = r + addR;
            const targetC = c + addC;

            if(targetR < N && targetR >= 0 && targetC < N && targetC >= 0 && buckets[targetR][targetC] > 0){
                    cnt += 1;
            }
        }

        newBuckets[r][c] += cnt;
    })

    buckets = newBuckets;

    const beforeClouds = [...clouds];
    clouds = [];

    for(let i = 0; i < N; i++){
        for(let j = 0; j < N; j++){

           // const isSameAsBefore = beforeClouds.some(([r, c]) => r === i && c === j);
            if(buckets[i][j] >= 2 && !visited[i][j]){
                buckets[i][j] -= 2;
                clouds.push([i, j]);
            }
        }
    }
    // console.log('clouds');
    // console.log(clouds);
    // console.log('buckets');
    // console.log(buckets);
    // console.log('---');
}


let result = 0;
for(let i = 0; i < N; i++){
    for(let j = 0; j < N; j++){
        result += buckets[i][j];
    }
}

console.log(result);

