class Node {
    constructor(data, priority) {
        this.data = data;
        this.priority = priority;
        this.parent = null;
        this.left = null;
        this.right = null;
    }

    static copy(node) {
        return new Node(node.data, node.priority);
    }

    isNotExistLeft() {
        return this.equalsLeft();
    }

    isNotExistRight() {
        return this.equalsRight();
    }

    isNotExistParent() {
        return this.equalsParent();
    }

    equalsLeft(node = null) {
        return this.left === node;
    }

    equalsRight(node = null) {
        return this.right === node;
    }

    equalsParent(node = null) {
        return this.parent === node
    }

    appendChild(node) {
        if (this.isNotExistLeft()) {
            this.left = node;
            this.left.parent = this;
        } else if (this.isNotExistRight()) {
            this.right = node;
            this.right.parent = this;
        }
    }

    removeChild(node) {
        if (!this.isNotExistLeft() && this.equalsLeft(node)) {
            this.left.parent = null;
            this.left = null;
        } else if (!this.isNotExistRight() && this.equalsRight(node)) {
            this.right.parent = null;
            this.right = null;
        } else {
            throw new Error();
        }
    }

	isGtPriority(node) {
    	return this.priority > node.priority;
	}

    remove() {
        if (!this.isNotExistParent()) {
            this.parent.removeChild(this);
        }
    }

    swapWithParent() {
    	if (!this.isNotExistParent()) {
			let model = new Model(this);
			if (model.childLeft)
				model.parent.appendChild(model.childLeft);
			if (model.childRight)
				model.parent.appendChild(model.childRight);
			model.parent.parent = model.current;
			if (model.currentNodeIsLeft) {
				model.current.appendChild(model.parent);
				if (model.childOfParent)
					model.current.appendChild(model.childOfParent);
			} else {
				if (model.childOfParent)
					model.current.appendChild(model.childOfParent);
				model.current.appendChild(model.parent);
			}
			if (model.parentOfParent) {
				if (model.parentNodeIsLeft) {
					model.parentOfParent.left = model.current;
				} else {
					model.parentOfParent.right = model.current;
				}
				model.current.parent = model.parentOfParent;
			}
		}
    }
}

class Model {
    constructor(node) {
		this.current = node;
		this.childLeft = this.current.left;
		this.childRight = this.current.right;
		this.parent = this.current.parent;
		this.childOfParent = null;
		this.currentNodeIsLeft = this.parent.equalsLeft(this.current);
		if (!this.current.isNotExistLeft()) {
			this.childLeft.parent = null;
		}
		if (!this.current.isNotExistRight()) {
			this.childRight.parent = null;
		}
		if (this.currentNodeIsLeft) {
			this.parent.left = null;
			this.childOfParent = this.parent.right;
			this.parent.right = null;
		} else {
			this.parent.right = null;
			this.childOfParent = this.parent.left;
			this.parent.left = null;
		}
		if (this.childOfParent) {
			this.childOfParent.parent = null;
		}
		this.parentOfParent = null;
		this.parentNodeIsLeft = null;
		this.current.left = null;
		this.current.right = null;
		this.current.parent = null;
		if (!this.parent.isNotExistParent()) {
			this.parentOfParent = this.parent.parent;
			this.parentNodeIsLeft = this.parentOfParent.equalsLeft(this.parent);
			this.parent.parent = null;
			if (this.parentNodeIsLeft) {
				this.parentOfParent.left = null;
			} else {
				this.parentOfParent.right = null;
			}
		}
    }
}

module.exports = Node;
