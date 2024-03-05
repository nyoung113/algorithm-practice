function solution(genres, plays) {
    const map = new Map();
    for(let i = 0; i < genres.length; i++){
        if(map.get(genres[i])){
            map.set(genres[i], [[ ...map.get(genres[i])[0], i], map.get(genres[i])[1] + plays[i]]);
        }else {
            map.set(genres[i], [[i], plays[i]]);
        }
    }

    return Array.from(map)
    .sort((a, b) => b[1][1] - a[1][1]).map((items) => items[1]).map((items) => 
    items[0].sort((a, b) => plays[b] !== plays[a] ? plays[b] - plays[a] : a - b))
    // reduce 문법 확인 : initialValue를 설정하지 않았을 경우에는 cur의 index === 1
    .reduce((acc, cur) => [...acc, ...cur.slice(0, 2)], []);
}