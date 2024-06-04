const input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n')



const [R, C] = input.shift().split(' ').map(Number);
//
// 50년이 지나면, 인접한 3칸 또는 4칸에 바다가 있는 땅은 모두 잠긴다.
// 50년이 지난 후에도 섬은 적어도 한 개 있다. 또한 지도에 없는 곳은 모두 바다이다.

const result = [];
// 왼 앞 오른 뒤
const directions = [[1, 0], [0, 1], [-1, 0], [0, -1]];
for(let curY = 0; curY < R; curY++){
    let line = '';
    for(let curX = 0; curX < C; curX++){
        // edge에 있는 곳 => 2개만 바다여도 바다로 만듦
        // 가운데 => 3개에 있는 곳이면 바다로 만듦

        if(input[curY][curX] === '.')
        {
            line += '.';
            // console.log(curY, curX, '.');
            continue;
        }

        let seaCnt = 0;
        directions.forEach(([addX, addY]) => {
            const nextX = curX + addX;
            const nextY = curY + addY;

            if(nextX < 0 || nextX > C - 1 || nextY < 0 || nextY > R - 1 ||  input[nextY][nextX] === '.'){
                seaCnt += 1;
            }
        })
        // console.log(curY, curX, seaCnt);


         if(seaCnt > 2){
             line += '.';
        }else {
             line += 'X';
        }
    }
    // console.log('next line');
    result.push(line)
}


while(true){
    // console.log(result);
    const top = result[0].split('').every((v) => v === '.');
    const bottom = result[result.length - 1].split('').every((v) => v === '.');

    let left = true;
    let right = true;
    for(let i = 0; i < result.length; i++){
            if(result[i][0] === 'X') left = false;
            if(result[i][result[0].length - 1] === 'X') right = false;
    }

    if(!top && !bottom && !left && !right){
        break;
    }

    if(top){
        result.shift()
    }
    if(bottom){
        result.pop();
    }
    if(left){
        for(let i = 0; i < result.length; i++){
            result[i] = result[i].slice(1);
        }
    }
    if(right){
        for(let i = 0; i < result.length; i++){
            result[i] = result[i].slice(0, result[i].length - 1);
        }
    }
}



console.log(result.join('\n'));
