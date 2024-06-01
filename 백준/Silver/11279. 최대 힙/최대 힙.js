const input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n').map(Number)

const N = input.shift();

class MaxHeap {
    heap
    constructor() {
        this.heap = [ null ];
    }

    #swap(idx1, idx2){
        [this.heap[idx1], this.heap[idx2]] = [this.heap[idx2], this.heap[idx1]]
    }

    heappush(value){
        this.heap.push(value);


        let curIdx = this.heap.length - 1;
        let parentIdx = Math.floor(curIdx / 2);

        if(curIdx === 1) return;

        while(this.heap[parentIdx] && this.heap[curIdx] > this.heap[parentIdx]){
            this.#swap(curIdx, parentIdx);
            curIdx = parentIdx;
            parentIdx = Math.floor(curIdx / 2);
        }
    }

    heappop(){
        if(this.heap.length === 1) return 0;
        if(this.heap.length === 2) return this.heap.pop();

          this.#swap(1, this.heap.length - 1);
          const returnValue = this.heap.pop();

          let curIdx = 1;
          let leftIdx = curIdx * 2;
          let rightIdx = curIdx * 2 + 1;

          while((this.heap[leftIdx] && this.heap[curIdx] < this.heap[leftIdx])
          || (this.heap[rightIdx] && this.heap[curIdx] < this.heap[rightIdx])){
              if(!this.heap[rightIdx]) {
                  this.#swap(curIdx, leftIdx);
                  curIdx = leftIdx;
              }else if(this.heap[leftIdx] > this.heap[rightIdx]){
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

const heap = new MaxHeap();

const result = [];
for(let i = 0; i < N; i++){
    if(input[i] !== 0) {
        heap.heappush(input[i])
    }
    else {
        result.push(heap.heappop());
    }
}

console.log(result.join('\n'));