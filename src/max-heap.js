const Node = require('./node');

class MaxHeap {
    constructor() {
        this.root = null;
        this.parentNodes = [];
        this._size = 0;
    }

    push(data, priority) {
        let node = new Node(data, priority);
        this.insertNode(node);
        this.shiftNodeUp(node);
    }

    pop() {
        if (!this.isEmpty()) {
            let detach = this.detachRoot();
            this._size--;
            this.restoreRootFromLastInsertedNode(detach);
            if (this.root != null) {
                this.shiftNodeDown(this.root);
            }
            return detach.data;
        }
    }

    detachRoot() {
        let root = this.root;
        this.root = null;
        let indexOfRoot = this.parentNodes.indexOf(root);
        if (indexOfRoot !== -1) {
            this.parentNodes.splice(indexOfRoot, 1);
        }
        return root;
    }

    restoreRootFromLastInsertedNode(detached) {
        let lastInsert = this.parentNodes.pop();
        if (lastInsert === undefined) {
            return;
        }

        if (lastInsert.equalsParent(detached)) {
            if (detached.equalsLeft(lastInsert)) {
                if (!detached.isNotExistRight()) {
                    lastInsert.right = detached.right;
                    detached.right.parent = lastInsert;
                }
            } else {
                if (!detached.isNotExistLeft()) {
                    lastInsert.left = detached.left;
                    detached.left.parent = lastInsert;
                }
            }
        } else {
            if (!detached.isNotExistRight()) {
                lastInsert.right = detached.right;
                detached.right.parent = lastInsert;
            }
            if (!detached.isNotExistLeft()) {
                lastInsert.left = detached.left;
                detached.left.parent = lastInsert;
            }
            if (lastInsert.parent.left === lastInsert) {
                lastInsert.parent.left = null;
            } else {
                lastInsert.parent.right = null;
                this.parentNodes.unshift(lastInsert.parent);
            }
        }

        this.root = lastInsert;
        if (this.root.isNotExistRight()) {
            this.parentNodes.unshift(this.root);
        }
        lastInsert.parent = null;
    }

    size() {
        return this._size;
    }

    isEmpty() {
        return this._size === 0;
    }

    clear() {
        this._size = 0;
        this.root = null;
        this.parentNodes = [];

    }

    insertNode(node) {
        if (this.isEmpty()) {
            this.root = node;
        } else {
            this.parentNodes[0].appendChild(node);
            if (this.parentNodes[0].right) this.parentNodes.shift();
        }
        this.parentNodes.push(node);
        this._size++;
    }

    nodeIsRoot(node) {
        return this.root === node;
    }

    shiftNodeUp(node) {
        if (!this.nodeIsRoot(node) && node.isGtPriority(node.parent)) {

            let parent = node.parent;
            let indexOfParent = this.parentNodes.indexOf(parent);
            let indexOfNode = this.parentNodes.indexOf(node);

            node.swapWithParent();

            if (indexOfParent !== -1) {
                this.parentNodes[indexOfParent] = node;
            }
            this.parentNodes[indexOfNode] = parent;
            if (this.nodeIsRoot(parent)) {
                this.root = node;
            }

            this.shiftNodeUp(node);
        }
    }

    shiftNodeDown(node) {

        let child = null;
        if ((node.left != null && node.right != null && node.priority < node.left.priority && node.left.priority > node.right.priority)
            || (node.right === null && node.left != null && node.priority < node.left.priority)) {
            child = node.left;
        } else if ((node.left != null && node.right != null && node.priority < node.right.priority && node.left.priority < node.right.priority)
            || (node.left === null && node.right != null && node.priority < node.right.priority)) {
            child = node.right;
        }

        if (child != null) {

            let indexOfChild = this.parentNodes.indexOf(child);
            let indexOfNode = this.parentNodes.indexOf(node);

            child.swapWithParent();

            if (child.parent === null) {
                this.root = child;
            }

            if (indexOfChild !== -1) {
                this.parentNodes[indexOfChild] = node;
                if (indexOfNode !== -1) {
                    this.parentNodes[indexOfNode] = child;
                }
            }

            this.shiftNodeDown(node);
        }
    }
}

module.exports = MaxHeap;
