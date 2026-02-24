class Node {
  constructor(data, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

class Tree {
  constructor(array = []) {
    this.root = this._buildTree(array);
  }


  _buildTree(array) {
    if (!Array.isArray(array) || array.length === 0) return null;
    const uniq = Array.from(new Set(array)).sort((a, b) => a - b);

    const build = (arr, start, end) => {
      if (start > end) return null;
      const mid = Math.floor((start + end) / 2);
      const node = new Node(arr[mid]);
      node.left = build(arr, start, mid - 1);
      node.right = build(arr, mid + 1, end);
      return node;
    };

    return build(uniq, 0, uniq.length - 1);
  }

  includes(value) {
    let curr = this.root;
    while (curr) {
      if (value === curr.data) return true;
      curr = value < curr.data ? curr.left : curr.right;
    }
    return false;
  }

  insert(value) {
    if (this.root === null) {
      this.root = new Node(value);
      return;
    }
    let curr = this.root;
    while (true) {
      if (value === curr.data) return; // no duplicates
      if (value < curr.data) {
        if (curr.left === null) {
          curr.left = new Node(value);
          return;
        }
        curr = curr.left;
      } else {
        if (curr.right === null) {
          curr.right = new Node(value);
          return;
        }
        curr = curr.right;
      }
    }
  }

  deleteItem(value) {
    const deleteNode = (node, val) => {
      if (!node) return null;
      if (val < node.data) {
        node.left = deleteNode(node.left, val);
        return node;
      }
      if (val > node.data) {
        node.right = deleteNode(node.right, val);
        return node;
      }
    
      if (!node.left && !node.right) return null;
    
      if (!node.left) return node.right;
      if (!node.right) return node.left;
     
      let successorParent = node;
      let successor = node.right;
      while (successor.left) {
        successorParent = successor;
        successor = successor.left;
      }
      node.data = successor.data;
      // delete successor node
      if (successorParent === node) {
        successorParent.right = deleteNode(successorParent.right, successor.data);
      } else {
        successorParent.left = deleteNode(successorParent.left, successor.data);
      }
      return node;
    };

    this.root = deleteNode(this.root, value);
  }

  levelOrderForEach(callback) {
    if (typeof callback !== 'function') throw new Error('A callback is required');
    const q = [];
    if (this.root) q.push(this.root);
    while (q.length) {
      const node = q.shift();
      callback(node.data);
      if (node.left) q.push(node.left);
      if (node.right) q.push(node.right);
    }
  }

  inOrderForEach(callback) {
    if (typeof callback !== 'function') throw new Error('A callback is required');
    const traverse = (node) => {
      if (!node) return;
      traverse(node.left);
      callback(node.data);
      traverse(node.right);
    };
    traverse(this.root);
  }

  preOrderForEach(callback) {
    if (typeof callback !== 'function') throw new Error('A callback is required');
    const traverse = (node) => {
      if (!node) return;
      callback(node.data);
      traverse(node.left);
      traverse(node.right);
    };
    traverse(this.root);
  }

  postOrderForEach(callback) {
    if (typeof callback !== 'function') throw new Error('A callback is required');
    const traverse = (node) => {
      if (!node) return;
      traverse(node.left);
      traverse(node.right);
      callback(node.data);
    };
    traverse(this.root);
  }

  
  height(value) {
    const findNode = (node, val) => {
      if (!node) return null;
      if (val === node.data) return node;
      return val < node.data ? findNode(node.left, val) : findNode(node.right, val);
    };
    const node = findNode(this.root, value);
    if (!node) return undefined;
    const h = (n) => {
      if (!n) return -1; // so leaf returns 0
      return Math.max(h(n.left), h(n.right)) + 1;
    };
    return h(node);
  }

  depth(value) {
    let curr = this.root;
    let d = 0;
    while (curr) {
      if (value === curr.data) return d;
      if (value < curr.data) curr = curr.left;
      else curr = curr.right;
      d++;
    }
    return undefined;
  }

 
  _checkBalanced(node) {
    if (!node) return -1;
    const leftH = this._checkBalanced(node.left);
    if (Number.isNaN(leftH)) return NaN;
    const rightH = this._checkBalanced(node.right);
    if (Number.isNaN(rightH)) return NaN;
    if (Math.abs(leftH - rightH) > 1) return NaN;
    return Math.max(leftH, rightH) + 1;
  }

  isBalanced() {
    const res = this._checkBalanced(this.root);
    return !Number.isNaN(res);
  }

  rebalance() {
    const arr = [];
    this.inOrderForEach((v) => arr.push(v));
    this.root = this._buildTree(arr);
  }
}


const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null || node === undefined) {
    return;
  }

  prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
};

module.exports = { Node, Tree, prettyPrint };
