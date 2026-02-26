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

    includes(value){
        let current = this.root;

        while(current){
            if(value < current.data) current = current.left;
            else if(value > current.data) current = current.right;
            else return true;
        }

        return false;
    }

    insert(value){
        let current = this.root;
        let parentNode = current;
        const newNode = new Node(value);

        // Exit loop when current is null while saving the current node's parent
        while(current){
            if(value === current.data) return;
            else if(value < current.data){
                parentNode = current;
                current = current.left;
            }
            else if(value > current.data){
                parentNode = current;
                current = current.right;
            }
        }

        if(value < parentNode.data) parentNode.left = newNode;
        else parentNode.right = newNode;
    }

    deleteItem(value){
        let current = this.root;
        let parentNode = null;

        // Traverse the tree to find the node to delete
        while(current){
            if(value < current.data){
                parentNode = current;
                current = current.left;
            }
            else if(value > current.data){
                parentNode = current;
                current = current.right
            }

            // Found node to delete
            else{
                // Case 1 and 2: deleting a leaf node or node with 1 child
                if(!current.left || !current.right){
                    // Set child to be the next single child node or null if deleting leaf
                    const child = current.left ? current.left : current.right; 

                    if(!parentNode) this.root = child;  // Deleting root node with no children or 1 child
                    else if(parentNode.left === current) parentNode.left = child;
                    else parentNode.right = child;
                    return;
                }

                // Case 3: deleting a node with 2 children
                // Find next in order successor (smallest node in the right subtree)
                let successorParent = current;
                let successorNode = current.right;
                while(successorNode.left){
                    successorParent = successorNode;
                    successorNode = successorNode.left;
                }

                current.data = successorNode.data;

                // Delete successor node
                if(successorParent.left === successorNode) successorParent.left = successorNode.right;
                else successorParent.right = successorNode.right;
                return;
            }
        }
    }

    levelOrderForEach(callback){
        if(!callback) throw new Error("Callback function must be provided.");

        const queue = [];
        if(this.root) queue.push(this.root);

        while(queue.length > 0){
            let current = queue.shift();
            callback(current.data);
            if(current.left) queue.push(current.left);
            if(current.right) queue.push(current.right);
        }
    }

    inOrderForEach(callback){
        if(!callback) throw new Error("Callback function must be provided.");
        
        function traverse(node){
            if(!node) return;

            traverse(node.left);
            callback(node.data);
            traverse(node.right);
        }

        traverse(this.root);
    }

    preOrderForEach(callback){
        if(!callback) throw new Error("Callback function must be provided.");
        
        function traverse(node){
            if(!node) return;

            callback(node.data);
            traverse(node.left);
            traverse(node.right);
        }

        traverse(this.root);
    }

    postOrderForEach(callback){
        if(!callback) throw new Error("Callback function must be provided.");
        
        function traverse(node){
            if(!node) return;

            traverse(node.left);
            traverse(node.right);
            callback(node.data);
        }

        traverse(this.root);
    }

    height(value){
        let current = this.root;

        while(current){
            if(value < current.data) current = current.left;
            else if(value > current.data) current = current.right;
            else return this._heightFromNode(current);
        }

        return undefined;
    }

    _heightFromNode(node){
            if(!node) return -1;

            let leftHeight = this._heightFromNode(node.left);
            let rightHeight = this._heightFromNode(node.right);
            return 1 + Math.max(leftHeight, rightHeight);
        }

    depth(value){
        let current = this.root;
        let depthCount = 0;

        while(current){
            if(value < current.data){
                depthCount++;
                current = current.left;
            } else if(value > current.data){
                depthCount++;
                current = current.right;
            } else return depthCount;
        }

        return undefined;
    }

    isBalanced(node = this.root){
        if(!node) return true;

        let leftHeight = this._heightFromNode(node.left);
        let rightHeight = this._heightFromNode(node.right);

        if(Math.abs(leftHeight - rightHeight) > 1) return false;

        return this.isBalanced(node.left) && this.isBalanced(node.right);
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