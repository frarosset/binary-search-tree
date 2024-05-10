import Node from "./Node.js"

let nodeLeft = new Node('L');
let nodeRight = new Node('R');

let nodeRoot = new Node('N',nodeLeft, nodeRight);
let printNode = (node) => `'${node ? node.data : node}'`;

console.log('Root node: ', printNode(nodeRoot));
console.log('-Left node: ', printNode(nodeRoot.left));
console.log('--Left node: ', printNode(nodeRoot.left.left));
console.log('--Right node: ', printNode(nodeRoot.left.right));
console.log('-Right node: ', printNode(nodeRoot.right));
console.log('--Left node: ', printNode(nodeRoot.right.left));
console.log('--Right node: ', printNode(nodeRoot.right.right));

console.log('\nSwapping left right nodes on root');
[nodeRoot.left,nodeRoot.right] = [nodeRoot.right, nodeRoot.left];
nodeRoot.data = 'R swapped';

console.log('Root node: ', printNode(nodeRoot));
console.log('-Left node: ', printNode(nodeRoot.left));
console.log('--Left node: ', printNode(nodeRoot.left.left));
console.log('--Right node: ', printNode(nodeRoot.left.right));
console.log('-Right node: ', printNode(nodeRoot.right));
console.log('--Left node: ', printNode(nodeRoot.right.left));
console.log('--Right node: ', printNode(nodeRoot.right.right));

