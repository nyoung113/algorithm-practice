const input = require('fs')
    .readFileSync('/dev/stdin')
    .toString()
    .trim()
    .split('\n')

const N  = +input.shift()



// const direction = [[1, 0], [0, 1], [-1, 0], [0, -1]];

for(let i = 0; i < N; i++){
    let maxRX = 0;
    let maxRY = 0;

    let minLX = 0;
    let minLY = 0;

    const cur = [0, 0];
    let curDirection = [0, 1];

    const commands = input[i];

    for(let j = 0; j < commands.length; j++){
        const cmd = commands[j];
        // console.log(cmd);
        if(cmd === 'F'){
            // console.log('before location: ', cur);
            cur[0] += curDirection[0];
            cur[1] += curDirection[1];

            if (maxRX < cur[0]){
                maxRX = cur[0]
            }
            else if(minLX > cur[0]){
                minLX = cur[0]
            }

            if(maxRY < cur[1]){
                maxRY = cur[1]
            }
            else if(minLY > cur[1]){
                minLY = cur[1];
            }
            // console.log('next location: ', cur);
        }
        else if(cmd === 'B'){
            // console.log('before location : ', cur);
            cur[0] -= curDirection[0];
            cur[1] -= curDirection[1];

            if (maxRX < cur[0]){
                maxRX = cur[0]
            }
            else if(minLX > cur[0]){
                minLX = cur[0]
            }

            if(maxRY < cur[1]){
                maxRY = cur[1]
            }
            else if(minLY > cur[1]){
                minLY = cur[1];
            }
            // console.log('next location: ', cur);
        }
        else if(cmd === 'L'){
            // console.log('before dir: ', curDirection);
            // [0, 1] => [-1, 0]
            // [-1, 0] => [0, -1]
            // [0, -1] => [1, 0]
            // [1, 0] => [0, 1]

            const [x, y] = curDirection;

            if(x === 0 && y === 1){
                curDirection = [-1, 0];
            }else if(x === -1 && y === 0){
                curDirection = [0, -1];
            }else if(x === 0 && y === -1){
                curDirection = [1, 0];
            }else {
                curDirection = [0, 1]
            }

            // console.log('changed dir: ', curDirection);
        }
        else if(cmd === 'R'){
            // console.log('before dir: ', curDirection);
            // [0, 1] => [1, 0]
            // [1, 0] => [0, -1]
            // [0, -1] => [-1, 0]
            // [-1, 0] => [0, 1]

            const [x, y] = curDirection;

            if(x === 0 && y === 1){
                curDirection = [1, 0];
            }else if(x === 1 && y === 0){
                curDirection = [0, -1];
            }else if(x === 0 && y === -1){
                 curDirection = [-1, 0];
            }else {
                curDirection = [0, 1];
            }

            // console.log('changed dir: ', curDirection);
        }


    }

    // console.log(maxRX + Math.abs(minLX));
    // console.log(maxRY + Math.abs(minLY));
    const w = maxRX + Math.abs(minLX);
    const h = maxRY + Math.abs(minLY)

    console.log(w * h);
}