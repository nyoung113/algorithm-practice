const input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');

input.slice(1).forEach((str) => {
    const [bool, cnt] = isPalindrome(str);
    console.log(bool + " " + cnt)
})

function recursion (str, l, r, cnt) {
    cnt++;
    if(l >= r) return [1, cnt];
    if(str[l] !== str[r]) return [0, cnt];
    return recursion(str, l + 1, r - 1, cnt);
}

function isPalindrome (str) {
    return recursion(str, 0, str.length - 1, 0)
}