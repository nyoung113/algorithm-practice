const input = +require('fs').readFileSync('/dev/stdin').toString().trim()

if(input % 2 === 1){
    console.log('SK');
}else{
    console.log('CY');
}