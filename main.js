import { Tree, prettyPrint } from "./bst.js";

const tree = new Tree([1,2,3,4,5,6,7,8,9]);
prettyPrint(tree.root);

console.log(tree.includes(2));
console.log(tree.includes(10));

tree.insert(10);
tree.insert(11);
tree.insert(12);
tree.insert(8.5);
tree.insert(9.5);

tree.deleteItem(8);

prettyPrint(tree.root);

console.log(tree.height(3));
console.log(tree.depth(11));

console.log(tree.isBalanced());

