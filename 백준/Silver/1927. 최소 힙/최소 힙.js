class Heap {
    heap
    constructor() {
        this.heap = [null];
    }

    size(){
        return this.heap.length - 1
    }

    #swap(idx1, idx2){
        [this.heap[idx1], this.heap[idx2]] = [this.heap[idx2], this.heap[idx1]]
    }
    heappush(value){
        this.heap.push(value);
        if(this.size() === 1){
            return;
        }

        let curIdx = this.size();
        let parentIdx = Math.floor(curIdx / 2)

        while(this.heap[parentIdx] > this.heap[curIdx]){
            this.#swap(curIdx, parentIdx);
            curIdx = parentIdx;
            parentIdx = Math.floor(curIdx / 2)
        }
    }
    heappop(){
        if(this.size() === 0) return 0;
        if(this.size() === 1) return this.heap.pop();

        this.#swap(1, this.heap.length - 1);
        const returnValue = this.heap.pop();

        let curIdx = 1;
        let leftIdx = curIdx * 2;
        let rightIdx = curIdx * 2 + 1;

        while ((this.heap[leftIdx] && this.heap[curIdx] > this.heap[leftIdx] )|| (this.heap[rightIdx] && this.heap[curIdx] > this.heap[rightIdx])){
            if(!this.heap[rightIdx]){
                this.#swap(curIdx, leftIdx);
                curIdx = leftIdx;
            }else if(this.heap[rightIdx] > this.heap[leftIdx]){
                this.#swap(curIdx, leftIdx);
                curIdx = leftIdx;
            }else{
                this.#swap(curIdx, rightIdx);
                curIdx = rightIdx;
            }
             leftIdx = curIdx * 2;
             rightIdx = curIdx * 2 + 1;
        }
        return returnValue;
    }
}

const minHeap= new Heap();

const input = require('fs').readFileSync('/dev/stdin')
    .toString().trim().split('\n').map(Number)

const N = input.shift()

const array = [];
for(let i = 0; i < N; i++){
    if(input[i]){
        minHeap.heappush(input[i]);
    }else{
        array.push(minHeap.heappop());
    }
}

console.log(array.join('\n'));