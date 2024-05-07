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
}
