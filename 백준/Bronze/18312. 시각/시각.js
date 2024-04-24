const input = require('fs')
    .readFileSync('/dev/stdin')
    .toString()
    .trim()
    .split(' ').map(Number)

getTime(input[0], input[1])

function getTime(N, K){
    let hour = 0;
    let minute = 0;
    let second = 0;

    let cnt = 0;

    while(hour < N + 1) {
        const result = [hour, minute, second]
            .map((t) => t.toString()
                .padStart(2, '0')
                .split(''))
            .flat(2)
            .some((item) => Number(item) === K)

        cnt += result;

        if (second < 59) {
            second += 1;
        } else {
            if (minute < 59) {
                second = 0;
                minute += 1;
            } else {
                second = 0;
                minute = 0;
                hour += 1;
            }
        }

    }
    console.log(cnt)
}

