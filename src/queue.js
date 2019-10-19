const MaxHeap = require('./max-heap.js');

class PriorityQueue {
    constructor(maxSize = 30) {
        this.maxSize = maxSize;
        this.heap = new MaxHeap();
    }

    push(data, priority) {
        if (this.heap._size < this.maxSize) {
            this.heap.push(data, priority);
            return;
        }
        throw Error();
    }

    shift() {
        if (!this.heap.isEmpty()) {
            return this.heap.pop();
        }
        throw Error();
    }

    size() {
        return this.heap._size;
    }

    isEmpty() {
        return this.heap.isEmpty()
    }
}

module.exports = PriorityQueue;
