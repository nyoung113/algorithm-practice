// Run by Node.js
const readline = require('readline');

(async () => {
	let rl = readline.createInterface({ input: process.stdin });
	let N = null;
	let M = null;
	let landHeight = null;
	let rain = [];
	// 배수 시스템
	
	let cnt = 0; 
	for await (const line of rl) {
		if(!N && !M) [N, M] = line.split(' ').map(Number);
		else if(!landHeight) landHeight = line.split(' ').map(Number);
		else if(cnt + 1 < M){
			rain.push(line.split(' ').map(Number));
			cnt++;
		}else {
			rain.push(line.split(' ').map(Number));
			
			solution(N, M, landHeight, rain);
			rl.close();
		}
	}
	process.exit();
})();

function solution(N, M, landHeight, rain){

	let waterHeight = new Array(N).fill(0);
	// M일 동안 장마가 온다

	for(let i = 0; i < M; i++){ 
		// s ~ e 번째집 까지 비가 내린다.
		const [s, e] = rain[i];
		for(let j = s - 1; j < e; j++){
			waterHeight[j] += 1;
		}
		
		// 배수시스템은 장마가 시작한 지 3의 배수가 되는 날 마다, 비가 내리고 난 뒤 작동한다.
		if((i + 1) % 3 === 0){
			// 작동 날짜를 기준으로 2일 이내 비가 내린 위치에서만 작동한다.=> waterHeight를 배수시스템 작동 후에는 초기화해준다.
			// 배수시스템이 작동하면 물의 높이가 -1 된다
			for(let k = 0; k < N; k++){
				waterHeight[k] -= waterHeight[k] > 0 ? 1 : 0;	
			}
			
			//  확정된 높이를 landHeight에 더해준다
			for(let k = 0; k < N; k++){
				landHeight[k] += waterHeight[k];	
			}
			// waterHeight를 초기화해준다.
			waterHeight = waterHeight.fill(0);
		}
	}
	// 남은 물의 양도 더해준다. 
	for(let k = 0; k < N; k++){
		landHeight[k] += waterHeight[k];	
	}
	
	console.log(landHeight.join(' '));
}
