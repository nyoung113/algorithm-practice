// 3 * 3 배열, 인덱스는 1부터, 1초가 지나면 연산 적용

const input = require('fs')
    .readFileSync('/dev/stdin')
    .toString().trim().split('\n')
    .map((line) => line.split(' ').map(Number));

const [r, c, k] = input.shift();

let arr = input;

// 정렬=> 각 수가 몇 번 나왔는지, 오름차순
// 수와 등장횟수 넣음

let cnt = 0;
// console.log(`curArr : \n${arr.join('\n')}`);

for(let i = 0; i <= 100; i++){
    if(arr[r -1] && arr[r -1][c - 1] === k){
        break;
    }

    const rowNum = arr.length;
    const colNum = arr[0].length;

    cnt++;

    if(rowNum >= colNum){
        // console.log('R');
         arr = R(arr);
    }else{
        // console.log('C');
         arr = C(arr);
    }

    // 행 또는 열의 크기가 100을 넘어가는 경우에는 처음 100개를 제외한 나머지는 버린다.
    if(arr.length > 100) {
        arr = arr.slice(0, 100);
    }
    if(arr[0].length > 100){
        arr = arr.map((row) => row.slice(0, 100))
    }

    // console.log(`curArr : \n${arr.join('\n')}`);
}

console.log(cnt > 100 ? -1 : cnt);
// R 연산: 배열 A의 모든 행에 대해 정렬을 수행한다. 행 >= 열 일때 수행한다
function R (arr){
    // 정렬방법: 각 수가 몇 번 나왔는지에 따라, 오름차순, 수, 횟수

    let maxLen = 0;
    const rowArr = [];
    for(let i = 0; i < arr.length; i++){
        const map = new Map();
        for(let j = 0; j < arr[i].length; j++){
            if(arr[i][j] === 0){
                continue;
            }
            if(map.has(arr[i][j])){
                const before = map.get(arr[i][j]);
                map.set(arr[i][j], before + 1);
            }else {
                map.set(arr[i][j], 1)
            }
        }

        const newRow = Array.from(map);

        // 오름차순으로 정렬한다
        newRow.sort(sortFn);
        const flattedRow = newRow.flat();

        if(maxLen < flattedRow.length){
            maxLen = flattedRow.length;
        }

        rowArr.push(flattedRow);
        // console.log('row push', newRow.flat());
    }
    // 가장 큰 행을 기준으로 모든 행의 크기가 변한다.
    const newArr = new Array(arr.length).fill(0).map(() => new Array(maxLen).fill(0));
    // console.log(newArr);


    for(let i = 0; i < rowArr.length; i++){
        for(let j = 0; j < rowArr[i].length; j++){
            newArr[i][j] = rowArr[i][j];
        }
    }

    return newArr;
}

// C 연산: 배열 A의 모든 열에 대해 정렬을 수행한다. 행 < 열 일때 수행한다
function C(arr){
    let maxLen =  0;
    const colArr = [];

    for(let i = 0; i < arr[0].length; i++){
        const map = new Map();

        for(let j = 0; j < arr.length; j++){
            if(arr[j][i] === 0){
                continue;
            }
            if(map.has(arr[j][i])){
                const before = map.get(arr[j][i]);
                map.set(arr[j][i], before + 1);
            }else {
                map.set(arr[j][i], 1)
            }
        }

        const mapArr = Array.from(map);
        mapArr.sort(sortFn);
        const newCol = mapArr.flat();
        colArr.push(newCol);

        if(maxLen < newCol.length){
            maxLen = newCol.length;
        }
    }
    // console.log(maxLen);
    const newArr = new Array(maxLen).fill(0).map(() => new Array(arr[0].length).fill(0))
    // console.log(newArr);
    // console.log(colArr);
    //

    for(let i = 0; i < colArr.length; i++){
        for(let j = 0; j < colArr[i].length; j++){
            newArr[j][i] = colArr[i][j];
        }
    }

    // console.log(newArr);

     return newArr;
}

function sortFn([a, aCnt], [b, bCnt]){
    if(aCnt - bCnt !== 0){
        return aCnt - bCnt;
    }
    return a - b
}


