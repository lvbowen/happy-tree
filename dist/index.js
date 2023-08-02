class TreeNode {
    constructor(data) {
      this.data = data;
      this.children = [];
    }
  }
  
  class Tree {
    constructor(data) {
      this.root = new TreeNode(data);
    }
  
    traverseDFS(callback) {
      (function recursiveDFS(node) {
        callback(node);
  
        node.children.forEach(childNode => {
          recursiveDFS(childNode);
        });
      })(this.root);
    }
  
    traverseBFS(callback) {
      const queue = [this.root];
  
      while (queue.length) {
        const currentNode = queue.shift();
        callback(currentNode);
        queue.push(...currentNode.children);
      }
    }
  
    findNodeBFS(data) {
      let result = null;
  
      this.traverseBFS(node => {
        if (node.data === data) {
          result = node;
        }
      });
  
      return result;
    }
  
    insertChildAt(parentData, childData) {
      const parentNode = this.findNodeBFS(parentData);
  
      if (parentNode) {
        parentNode.children.push(new TreeNode(childData));
      } else {
        throw new Error("Invalid parent data.");
      }
    }
  
    removeChildAt(parentData, childData) {
      const parentNode = this.findNodeBFS(parentData);
  
      if (parentNode) {
        parentNode.children = parentNode.children.filter(
          child => child.data !== childData
        );
      } else {
        throw new Error("Invalid parent data.");
      }
    }
  
    moveChildTo(destinationData, childData) {
      const childNode = this.findNodeBFS(childData);
  
      if (!childNode) {
        throw new Error("Invalid child data.");
      }
  
      const newParentNode = this.findNodeBFS(destinationData);
  
      if (!newParentNode) {
        throw new Error("Invalid destination data.");
      }
  
      this.removeChildAt(childNode.parent.data, childData);
      newParentNode.children.push(childNode);
    }
  }

export { Tree as default };
