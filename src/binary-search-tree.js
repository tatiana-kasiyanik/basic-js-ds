const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  
  constructor() {
    this.rootNode = null;
  }

  root() {
    return this.rootNode;
  }

  add(data) {
    this.rootNode = addWithin(data, this.rootNode);
    function addWithin(data, node) {
      if (node === null) {
        return new Node(data);
      }
      if (data > node.data) {
        node.right = addWithin(data, node.right);
      } else if (data < node.data) {
        node.left = addWithin(data, node.left);
      }
      return node;
    }
  }

  has(data) {
    let node = this.find(data);
    return node !== null && node.data === data;
  }

  find(data) {
    let node = this.rootNode;
    while (node !== null) {
      if (data === node.data) {
        return node;
      } else if (data < node.data) {
        node = node.left;
      } else {
        node = node.right;
      }
    }
    return null;
  }

  remove(data) {
    this.rootNode = removeWithin(data, this.rootNode);
    function removeWithin(data, node) {
      if (node === null) {
        return null;
      }
      if (data > node.data) {
        node.right = removeWithin(data, node.right);
      } else if (data < node.data) {
        node.left = removeWithin(data, node.left);
      } else {
        if (node.left === null && node.right === null) {
          node = null;
        } else if (node.right !== null && node.left === null) {
          node = node.right;
        } else if (node.left !== null && node.right === null) {
          node = node.left;
        } else {
          let maxLeftNode = node.left;
          while (maxLeftNode.right !== null) {
            maxLeftNode = maxLeftNode.right;
          }
          node.data = maxLeftNode.data;
          node.left = removeWithin(maxLeftNode.data, node.left)
        }
      }
      return node;
    }
  }

  min() {
    if (this.rootNode === null) {
      return null;
    }
    let node = this.rootNode;
    while (node.left !== null) {
      node = node.left;
    }
    return node.data;
  }


  max() {
    if (this.rootNode === null) {
      return null;
    }
    let node = this.rootNode;
    while (node.right !== null) {
      node = node.right;
    }
    return node.data;
  }
}

module.exports = {
  BinarySearchTree
};