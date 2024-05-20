// 재료 N 개
// 신 맛 S 쓴 맛 B
// 음식의 S => 사용한 재료의 S의 곱
// 음식의 B => 사용한 재료의 B의 합
// S 와 B의 차이를 최대한 적게
// 재료는 한 개 이상

const input =  require('fs').readFileSync('/dev/stdin').toString().trim().split('\n')

const N = +input.shift()

const ingredients = input.map((v => v.split(' ').map(Number)))

const result = [];
combination([], [...ingredients], N);


const diffArr = [];
for(let i = 0; i < result.length; i++){
   const diff = calIngredients(result[i])
    diffArr.push(diff);
}

console.log(Math.min(...diffArr));

function combination(curArr, rest, cnt){
    if(curArr.length === cnt){
        return;
    }

    rest.forEach((cur, idx, arr) => {
        const rest = arr.slice(idx + 1);
        result.push([...curArr, cur]);
        combination([...curArr, cur], [...rest], cnt);
    })
}

function calIngredients(ingredientArr){

    ingredientArr = ingredientArr.reduce(([accS, accB], [curS, curB]) => {
        return [accS * curS, accB + curB]
    })

    return Math.abs(ingredientArr[0] - ingredientArr[1])
}
