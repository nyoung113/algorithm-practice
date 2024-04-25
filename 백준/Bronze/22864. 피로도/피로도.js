const TEST_PATH = '/dev/stdin'

function getOneLineInputWithSpaceToNumberArray(){
    return require('fs')
        .readFileSync(TEST_PATH)
        .toString()
        .trim()
        .split(' ')
        .map(Number)
}
// 시간 당 피로도, 시간 당 일처리 속도, 시간 당 휴식 시 줄어드는 피로도, 최대 피로도
const [A, B, C, D] = getOneLineInputWithSpaceToNumberArray();

let tiredAmount = 0;
let workAmount = 0;

for(let i = 0; i < 24; i++){
    if(tiredAmount + A <= D){
        tiredAmount += A;
        workAmount += B;
    }else{
        tiredAmount = tiredAmount - C > 0 ? tiredAmount - C : 0;
    }
}

console.log(workAmount);