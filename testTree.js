import Tree from './Tree.js'

let array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
let tree = new Tree(array);

console.log('Array:',array);
console.log('Balanced Search Tree:');
tree.prettyPrint();

let dataToInsert = [2,7,323,24];
for (let data of dataToInsert){
    console.log(`\nInserting value ${data}`);
    tree.insert(data);
    tree.prettyPrint();
}

let dataToFind = [8,7,323,24, 67,93, 7000];
for (let data of dataToFind){
    let matchingNode = tree.find(data);
    console.log(`\nThe node with value ${data} is ${tree.printNode(matchingNode)}`);
}

let dataToDelete = [9, 8,67, 23, 3, 4, 123];
for (let data of dataToDelete){
    console.log(`\nDeleting node with value ${data}`);
    tree.delete(data);
    tree.prettyPrint();
}

// ---------------------------------------------------------------------

tree = new Tree([]);

console.log('\n\nBalanced Search Tree (empty):');
tree.prettyPrint();

for (let data of dataToInsert){
    console.log(`\nInserting value ${data}`);
    tree.insert(data);
    tree.prettyPrint();
}
for (let data of dataToInsert){
    console.log(`\nDeleting node with value ${data}`);
    tree.delete(data);
    tree.prettyPrint();
}

// ---------------------------------------------------------------------

console.log('\n\nBalanced Search Tree (re-filled):');
tree = new Tree(array);


const testCallback = (node) => {console.log(`testCallback: processing node ${tree.printNode(node)}`)};
console.log('\n\nBFS: Level-Order traversal (callback):');
tree.levelOrder(testCallback);
console.log('\nBFS: Level-Order traversal (without callback):')
console.log(tree.levelOrder());
tree.prettyPrint();


console.log('\n\nDFS: In-Order traversal {Left-Root-Right} (callback):');
tree.inOrder(testCallback);
console.log('\nDFS: In-Order traversal {Left-Root-Right} (without callback):')
console.log(tree.inOrder());
tree.prettyPrint();

console.log('\n\nDFS: Pre-Order traversal {Root-Left-Right} (callback):');
tree.preOrder(testCallback);
console.log('\nDFS: Pre-Order traversal {Root-Left-Right} (without callback):')
console.log(tree.preOrder());
tree.prettyPrint();

console.log('\n\nDFS: Post-Order traversal {Left-Right-Root} (callback):');
tree.postOrder(testCallback);
console.log('\nDFS: Post-Order traversal {Left-Right-Root} (without callback):')
console.log(tree.postOrder());
tree.prettyPrint();

console.log('\n\nGetting node\'s height (number of edges in the longest path from the node to a leaf) and depth (number of edges in the path from the node to the root)');
for (let data of dataToInsert){
    tree.insert(data);
}
tree.prettyPrint();
for (let data of dataToFind){
    let node = tree.find(data);
    let height = tree.height(node);
    let depth = tree.depth(node);
    console.log(`The node with value ${data} is ${tree.printNode(node)} and has height ${height} and depth ${depth}`);
}

let isTreeBalanced = tree.isBalanced();
console.log(`\n\nThe following tree is ${isTreeBalanced?'balanced':'not balanced'}:`);
tree.prettyPrint();
