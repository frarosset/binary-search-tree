import Node from './Node.js'

export default class Tree{
    #root = null;

    constructor(array){
        this.#root = this.#buildTree(array);
    }

    #buildTree(array){
        let root = null;

        console.log(array)
        // remove duplicates (to simplify the tree balancing)
        array = array.filter((val, idx, arr) => arr.indexOf(val) === idx);
        console.log(array)
        
        // sort the array using the sort() method
        // its complexity depends on the implementation
        // however, you can expect O(n log(n)) if using Mergesort	
        array.sort((a,b) => a-b);
        console.log(array);

        // todo

        return root;
    }
}