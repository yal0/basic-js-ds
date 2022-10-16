//const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  
  constructor() {
    this.treeRoot = null;
  }

  root() {
    return this.treeRoot;
  }

  add(data, root = this.treeRoot) {
    this.treeRoot = addData(this.treeRoot, data);

    function addData(node, data) {
      if (!node) {
        node = new Node(data);
        return node;
      }

      if (node.data === data) {
        return node;
      }

      if (node.data < data) {
        node.right = addData(node.right, data);
      }

      if (node.data > data) {
        node.left = addData(node.left, data);
      }

      return node;
    }
  }


  has(data) {
    return hasData(this.treeRoot, data);

    function hasData(node, data) {
      if (!node) {
        return false;
      }

      if (node.data == data) {
        return true;
      }

      if (node.data < data) {
        return hasData(node.right, data);
      } else {
        return hasData(node.left, data);
      }
    }
  }

  find(data) {
    return findNode(this.treeRoot, data);

    function findNode(node, data) {
      if (!node) {
        return null;
      }

      if (node.data == data) {
        return node;
      }

      if (node.data < data) {
        return findNode(node.right, data);
      } else {
        return findNode(node.left, data);
      }
    }
  }

  remove(data) {
    this.treeRoot = removeNode(this.treeRoot, data);

    function removeNode(node, data) {
      if (!node) {
        return null;
      }

      if (node.data < data) {
        node.right = removeNode(node.right, data);
        return node;
      } else if (node.data > data) {
        node.left = removeNode(node.left, data);
        return node;
      } else {

        if (!node.left && !node.right) {
          return null;
        }

        if (!node.left) {
          node = node.right;
          return node;
        }

        if (!node.right) {
          node = node.left;
          return node;
        }

        let currentData = node.right.data;
        let nextNode = node.right.left;

        while (nextNode) {
          currentData = nextNode.data;
          nextNode = nextNode.left;
        }

        node.data = currentData;

        node.right = removeNode(node.right, currentData);

        return node;
      }
    }
  }

  min(node = this.treeRoot) {
    if (!node) return null;
    while (node.left) {
        node = node.left;
    }
    return node.data;
}

max(node = this.treeRoot) {
    if (!node) return null;
    while (node.right) {
        node = node.right;
    }
    return node.data;
}
}

module.exports = {
  BinarySearchTree
};