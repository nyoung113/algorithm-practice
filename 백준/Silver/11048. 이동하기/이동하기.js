// N * M 미로
// 완전 탐색 (bfs) X => DP
// DP가 가능한 이유 => 뒤로 가기가 없음. 항상 앞으로 간다.
// 항상 앞으로 가기 때문에 이전 기록이 보장되어 있음

const input = require('fs').readFileSync('/dev/stdin')
    .toString()
    .trim().split('\n').map((line) => line.split(' ').map(Number));

const [N, M] = input.shift();

const graph = input;


const DP = new Array(N).fill(0).map(() => new Array(M).fill(0));

for(let i =0 ; i < N; i++){
    for (let j = 0; j < M; j++){
        const c1 =  i > 0 ? DP[i - 1][j] : 0;
        const c2 = j > 0 ? DP[i][j - 1] : 0;
        const c3 = j > 0 && i > 0 ? DP[i - 1][j - 1] : 0;

        DP[i][j] = graph[i][j] + Math.max(c1, c2, c3);
    }
}

console.log(DP[N -1][M - 1]);