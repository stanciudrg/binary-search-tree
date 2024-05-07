import mergeSort from "./mergeSort.js";
class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    // Holds the array sorted with the mergeSort algorithm
    this.cleanArray = array ? mergeSort([...new Set(array)]) : null;
    // Holds the tree built from the sorted array
    this.root = this.cleanArray
      ? this.buildTree(this.cleanArray, 0, this.cleanArray.length - 1)
      : null;
  }

  // Turns an array into a balanced binary tree full of Node objects appropriately placed
  // and returns the level-0 root node
  buildTree(array, start, end) {
    if (start > end) return null;

    const mid = parseInt((start + end) / 2);
    const node = new Node(array[mid]);
    node.left = this.buildTree(array, start, mid - 1);
    node.right = this.buildTree(array, mid + 1, end);

    return node;
  }

  insert(value) {
    this.insertNode(this.root, value);
  }

  // Inserts a given value into the tree
  insertNode(root, value) {
    if (root === null) return (root = new Node(value));
    if (root.data > value) root.left = this.insertNode(root.left, value);
    if (root.data < value) root.right = this.insertNode(root.right, value);

    return root;
  }

  delete(value) {
    this.deleteNode(this.root, value);
  }

  // Deletes a given value from the tree
  deleteNode(root, value) {
    if (root === null) return root;
    // If value is bigger than current root's data, the node must be on the left subtree
    if (root.data > value) root.left = this.deleteNode(root.left, value);
    // If value is lower than current root's data, the node must be on the right subtree
    if (root.data < value) root.right = this.deleteNode(root.right, value);

    // If the node is found,
    if (root.data === value) {
      // And it has only one child,  return that child
      if (root.left === null) return root.right;
      if (root.right === null) return root.left;

      // Otherwise find the closest successor of this node
      const closestSuccessor = this.getLowestNode(root.right);
      // Replace the data of this node with the data of its closest successor...
      root.data = closestSuccessor.data;
      // ...and delete the closest successor (value == root.data == closestSuccessor.data)
      root.right = this.deleteNode(root.right, root.data);
    }

    return root;
  }

  find(value) {
    return this.findNode(this.root, value);
  }

  // Returns the node with the given value, if found
  findNode(root, value) {
    if (root === null) return;
    if (root.data === value) return root;

    if (root.data > value) return this.findNode(root.left, value);
    if (root.data < value) return this.findNode(root.right, value);

    return root;
  }

  height(node) {
    if (!node) return;
    if (!node.data) return;

    return this.getHeight(node, 0);
  }

  // Returns the height of the node, which is defined as the number of edges
  // in the longest path from a given node to a leaf node.
  getHeight(root, level) {
    if (root === null) return level;

    // Increase the level with each recursion to compare which
    // path reached a higher level
    const newLevel = level + 1;
    const leftLevel = this.getHeight(root.left, newLevel);
    const rightLevel = this.getHeight(root.right, newLevel);

    if (leftLevel > rightLevel) {
      return leftLevel;
    } else {
      return rightLevel;
    }
  }

  depth(node) {
    if (!node) return;
    if (!node.data) return;

    return this.getDepth(this.root, node, 0);
  }

  // Returns the depth of the node, which is defined as the number of edges in
  // the path from a given node to the tree’s root node.
  getDepth(root, node, level) {
    if (root === null) return;
    // Use 1-based indexing
    if (root.data == node.data) return level + 1;

    // Increase the level with each recursion to determine how many
    // levels it took to reach the root starting from the node
    const newLevel = level + 1;
    const leftLevel = this.getDepth(root.left, node, newLevel);
    const rightLevel = this.getDepth(root.right, node, newLevel);

    if (leftLevel) {
      return leftLevel;
    } else {
      return rightLevel;
    }
  }
}
