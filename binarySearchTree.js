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
}
