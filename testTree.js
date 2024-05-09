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

// ---------------------------------------------------------------------

let emptyTree = new Tree([]);

console.log('Balanced Search Tree (empty):');
emptyTree.prettyPrint();

for (let data of dataToInsert){
    console.log(`\nInserting value ${data}`);
    emptyTree.insert(data);
    emptyTree.prettyPrint();
}