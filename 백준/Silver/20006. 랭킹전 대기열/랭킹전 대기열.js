// 플레이어 입장 매칭 시스템
// 매칭 가능한 방 X (기존 방의 처음 입장한 플레이어로 -10 ~ 10까지) => 새로운 방 생성
// 입장 가능한 방이 있다면 정원이 찰 때 까지 모두 대기
// 이때 입장 가능한 방이 여러개이면 먼저 생성된 방 순서로
// 방의 정원이 다 차면 게임 시작



const input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n').map((line) => line.split(' '))

// 플레이어의 수 p, 방의 정원 m
const [p, m] = input.shift().map(Number);

let rooms = [];

const fullCheckArr = [];


for(let i = 0; i < p; i++){ // 300
    let [level, nickname] = input[i];
    level = Number(level);

    let isEnter = false;
    // 현재 있는 방을 체크함
    for(let j = 0; j < rooms.length; j++){ // 300
        // 처음 입장한 플레이어 기준으로 레벨 측정,
        const roomLevel = rooms[j][0][0];
        const isFull = fullCheckArr[j];

        // console.log(rooms[j], isFull);

        // -10 ~ +10까지 가능
        if(!isFull && roomLevel + 10 >= level && roomLevel - 10 <= level){
            rooms[j].push([level, nickname]);
            isEnter = true;
        }

        // 정원이 다 차면, 더 이상 못들어가도록 체크해줌
        if(rooms[j].length >= m){
            fullCheckArr[j] = true;
        }
        // 중복으로 들어가는 것을 막기 위해, break

        if(isEnter){
            break;
        }

    }

    // 들어가지 못했다면, 방을 하나 만들어줌
    if(!isEnter){
        rooms.push([[level, nickname]]);
        if(m === 1) {
            fullCheckArr.push(true);
        }else {
            fullCheckArr.push(false);
        }
    }
}

// console.log(fullCheckArr);
// console.log(rooms);

// 방이 만들어진 순서대로 출력
for(let i = 0; i < rooms.length; i++){
    if(fullCheckArr[i]){
        console.log('Started!');
    }else{
        console.log('Waiting!');
    }

    const room = rooms[i];
    room.sort(function (a, b) {
        const nameA = a[1];
        const nameB = b[1];
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0;
    });
    console.log(room.map(v => v.join(' ')).join('\n'));
}