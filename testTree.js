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

let emptyTree = new Tree([]);

console.log('\n\nBalanced Search Tree (empty):');
emptyTree.prettyPrint();

for (let data of dataToInsert){
    console.log(`\nInserting value ${data}`);
    emptyTree.insert(data);
    emptyTree.prettyPrint();
}
for (let data of dataToInsert){
    console.log(`\nDeleting node with value ${data}`);
    emptyTree.delete(data);
    emptyTree.prettyPrint();
}

// ---------------------------------------------------------------------

console.log('\n\nBalanced Search Tree (re-filled):');
tree = new Tree(array);
tree.prettyPrint();

const testCallback = (node) => {console.log(`testCallback: processing node ${tree.printNode(node)}`)};
console.log('\n\nInorder traversal (callback):');
tree.levelOrder(testCallback);
console.log('\nInorder traversal (without callback):')
console.log(tree.levelOrder());
