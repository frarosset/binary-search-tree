import Tree from './Tree.js'

const settings = (function(){
    const N = 30;
    const dataMin = 0;
    const dataMax = 100;

    const NInsert = 10;
    const dataMinInsert = 101;
    const dataMaxInsert = 200;

    return {N,dataMin,dataMax,NInsert,dataMinInsert,dataMaxInsert};
})();

const commonUtilities = (function(){
    const randomInt = function(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const getRandomArray = function(n,min,max){
        const arr = new Array(n).fill();
        arr.forEach((itm,idx,arr) => {
            arr[idx] = randomInt(min,max);
        });
        return arr;
    };

    return {randomInt,getRandomArray};
})();


let initialData = commonUtilities.getRandomArray(settings.N,settings.dataMin,settings.dataMax);
console.log('Data array:', initialData);

let tree = new Tree(initialData);
console.log('\nThe corresponding BST is:');
tree.prettyPrint();

let isTreeBalanced = tree.isBalanced();
console.log(`\n\nThe tree is ${isTreeBalanced?'balanced':'not balanced'}`);


console.log('\nBFS: Level-Order traversal:')
console.log(tree.levelOrder());

console.log('\nDFS: In-Order traversal {Left-Root-Right}:')
console.log(tree.inOrder());

console.log('\nDFS: Pre-Order traversal {Root-Left-Right}:')
console.log(tree.preOrder());

console.log('\nDFS: Post-Order traversal {Left-Right-Root}:')
console.log(tree.postOrder());

console.log('-----------------------------------------');

console.log('\n\nInserting the following values:');
for (let i=0; i<settings.NInsert; i++){
    let data = commonUtilities.randomInt(settings.dataMinInsert,settings.dataMaxInsert);
    console.log(data);
    tree.insert(data);
}

console.log('\nThe new BST is:');
tree.prettyPrint();

isTreeBalanced = tree.isBalanced();
console.log(`\n\nThe tree is ${isTreeBalanced?'balanced':'not balanced'}`);


console.log('\nBFS: Level-Order traversal:')
console.log(tree.levelOrder());

console.log('\nDFS: In-Order traversal {Left-Root-Right}:')
console.log(tree.inOrder());

console.log('\nDFS: Pre-Order traversal {Root-Left-Right}:')
console.log(tree.preOrder());

console.log('\nDFS: Post-Order traversal {Left-Right-Root}:')
console.log(tree.postOrder());


console.log('-----------------------------------------');

console.log('\n\nRebalancing the tree...');
tree.rebalance();

console.log('\nThe new BST is:');
tree.prettyPrint();

isTreeBalanced = tree.isBalanced();
console.log(`\n\nThe tree is ${isTreeBalanced?'balanced':'not balanced'}`);


console.log('\nBFS: Level-Order traversal:')
console.log(tree.levelOrder());

console.log('\nDFS: In-Order traversal {Left-Root-Right}:')
console.log(tree.inOrder());

console.log('\nDFS: Pre-Order traversal {Root-Left-Right}:')
console.log(tree.preOrder());

console.log('\nDFS: Post-Order traversal {Left-Right-Root}:')
console.log(tree.postOrder());