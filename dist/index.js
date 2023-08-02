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

  /**
   * 深度优先遍历
   * @param {*} callback
   */
  traverseDFS(callback) {
    (function recursiveDFS(node) {
      callback(node);

      node.children.forEach((childNode) => {
        recursiveDFS(childNode);
      });
    })(this.root);
  }

  /**
   * 广度优先遍历
   * @param {} callback
   */
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

    this.traverseBFS((node) => {
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
        (child) => child.data !== childData
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

  /**
   * 获取节点深度
   * @param {*} nodeData
   * @returns
   */
  depth(nodeData) {
    let depth = 0;
    let currentNode = this.findNodeBFS(nodeData);

    while (currentNode.parent) {
      depth++;
      currentNode = currentNode.parent;
    }

    return depth;
  }

  /**
   * 计算树的高度
   * @returns
   */
  height() {
    let height = 0;

    this.traverseDFS((node) => {
      const currentHeight = this.depth(node.data);
      if (currentHeight > height) height = currentHeight;
    });

    return height;
  }

  /**
   * 查找父节点
   * @param {*} data
   * @returns
   */
  findParent(data) {
    const childNode = this.findNodeBFS(data);

    return childNode ? childNode.parent : null;
  }

  /**
   * 获取兄弟节点
   * @param {*} data
   * @returns
   */
  getSiblings(data) {
    const node = this.findNodeBFS(data);

    if (!node || !node.parent) {
      return null;
    }

    const siblings = node.parent.children.filter(
      (sibling) => sibling.data !== data
    );
    return siblings;
  }
}

export { Tree as default };
