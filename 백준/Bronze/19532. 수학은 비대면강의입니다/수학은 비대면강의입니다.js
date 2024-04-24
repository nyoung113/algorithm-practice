function getOneLineNumberInputWithSpace(){
    return require('fs')
        .readFileSync('/dev/stdin')
        .toString()
        .trim()
        .split(' ')
        .map(Number)
}

solution(...getOneLineNumberInputWithSpace());
function solution(a, b, c, d, e, f){
    for(let x = -999; x < 1000; x++){
        for(let y = -999; y < 1000; y++){
            if((a * x + b * y === c)&& (d * x + e * y === f)){
                console.log(x + " " + y);
                return;
            }
        }
    }
}

