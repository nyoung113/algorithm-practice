// Run by Node.js

const readline = require("readline");
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

let N = null;
let maxArr = null;
let numArr = null;
let buttonCnt = 0;

rl.on("line", function(line) {
	if(!N) N = Number(line);
	else if(!maxArr) maxArr = line.split(' ').map(Number);
	else if(!numArr) numArr = line.split(' ').map(Number);
	else{
		buttonCnt = Number(line);
		
		solution(N, maxArr, numArr, buttonCnt);
		rl.close();
	}
}).on("close", function() {
	process.exit();
});

function solution(N, maxArr, numArr, buttonCnt){
	// N개의 자릿수
	// i 번째 자리에서는 0 ~ Ai까지의 숫자 표시
	// 버튼 누르면 => 가장 오른쪽 자리 숫자 1 증가
	// 최댓값 이상 => 최솟값 으로 만들고 왼쪽 자리 1 증가
	// 가장 왼쪽 자리 =>그냥 최솟값 0
	
	for(let i = 0; i < buttonCnt; i++){
		numArr[N - 1] += 1;
		
		for(let j = N - 1; j >= 0; j--){
				if(maxArr[j] < numArr[j]){
					if(j > 0) numArr[j - 1] += 1;
					numArr[j] = 0;
				}
		}		
	}

	console.log(numArr.join(''));
}