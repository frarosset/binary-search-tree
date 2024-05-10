import Tree from './Tree.js'

let printNode = (node) => `'${node ? node.data : node}'`;

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
    console.log(`\nThe node with value ${data} is ${printNode(matchingNode)}`);
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
