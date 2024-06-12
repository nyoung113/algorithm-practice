// Run by Node.js
const readline = require('readline');

(async () => {
	let rl = readline.createInterface({ input: process.stdin });
	
	let N = null;
	let graph = [];
	
	let cnt = 0;
	
	for await (const line of rl) {
		if(!N) N = Number(line);
		else if(cnt < N - 1){
			graph.push(line.trim().split(' ').map(Number));
			cnt++;
		}
		else{
			graph.push(line.trim().split(' ').map(Number));
			
			console.log(solution(N, graph));
			
			process.exit();
			rl.close();
		}
	}
	
})();


function solution(N, graph){
	
	if(graph.flat().every(v => v === 0)) return 0;
	
	// r, c
	//S(i,j) = 물들지 않은 단풍 나무의 개수
	// 상하좌우 인접한 구역 중 모두 물들어있는 구역의 수 만큼 줄어들음
	
	const direction = [[-1, 0], [0, -1], [1, 0], [0, 1]];
	
	let day = 0;
	
	while(true){
		day++;
		
		const S = new Array(N).fill(0).map(() => new Array(N).fill(0));
		
		for(let i = 0; i < N; i++){ // 40 * 40	
			for(let j = 0; j < N; j++){
				if(graph[i][j] === 0){
					continue;
				}
				
				let cnt = 0;
				
				direction.forEach(([addX, addY]) => {
					const targetX = addX + i;
					const targetY = addY + j;
					
					if(targetX < N && targetX >= 0 && targetY < N && targetY >= 0 && graph[targetX][targetY] === 0){
						cnt++;
					}
				})
				S[i][j] = graph[i][j] - cnt > 0 ? graph[i][j] - cnt : 0;
			}
			
		}
		if(S.flat().every(v => v === 0)) break;
		graph = S;
	}
	return day;
}
