class Node {
    constructor(data){
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(arr){
        // Remove duplicates and sort in ascending order
        const sortedArr = [... new Set(arr)].sort((a, b) => a - b);
        this.root = this.buildTree(sortedArr);
    }

    buildTree(arr){
        if(arr.length === 0) return null;

        let mid = Math.floor(arr.length / 2);
        let rootNode = new Node(arr[mid]);

        rootNode.left = this.buildTree(arr.slice(0, mid));
        rootNode.right = this.buildTree(arr.slice(mid + 1));

        return rootNode;
    }
}


// Provided code from Odin Project to visualize tree for testing
const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null || node === undefined) {
    return;
  }

  prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
}



export { Tree, prettyPrint }