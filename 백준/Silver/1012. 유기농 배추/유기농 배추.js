let input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n')

const T = +input.shift()

input = input.map((i) => i.split(' ').map(Number))


for(let i = 0; i < T; i++){
    const [N, M, K] = input.shift();
    // console.log(N, M, K);
    const arr = new Array(N).fill(0).map(() => new Array(M).fill(0));

    for(let i = 0; i < K; i ++){
        const [x, y] = input[i];
        arr[x][y] = 1;
    }
    // arr.forEach((item) => console.log(item.toString()))

    let cnt = 0;

    for(let i = 0; i < N; i++){
        for(let j = 0; j < M; j++){
            if(arr[i][j] === 1){
                cnt += 1;
                dfs(i, j);
                // console.log('-----');
                // console.log(cnt)
                // arr.forEach((item) => console.log(item.toString()))
            }
        }
    }

    function dfs(x, y){
        const top = x > 0 ? arr[x-1][y] : 0;
        const left = y > 0 ? arr[x][y -1] : 0;
        const bottom = x < arr.length - 1 ? arr[x + 1][y] : 0;
        const right = y < arr[0].length - 1 ? arr[x][y + 1] : 0;

        // console.log(top, left, bottom, right)
        if(!(top || left || bottom || right)){
            return;
        }

            if(top){
                arr[x - 1][y] = 0;
                dfs(x - 1, y);
            }
            if(left){
                arr[x][y -1] = 0;
                dfs(x, y - 1);
            }
            if(bottom){
                arr[x + 1][y] = 0;
                dfs(x + 1, y);
            }
            if(right){
                arr[x][y + 1] = 0;
                dfs(x, y + 1);
            }
    }
    console.log(cnt)
    // console.log('cnt : ', cnt)
    input = input.slice(K);
    // console.log(input);
}



