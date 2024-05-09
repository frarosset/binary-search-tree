import Node from './Node.js'

export default class Tree{
    #root = null;

    constructor(array){
        this.#root = this.#buildTree(array);
    }

    #buildTree(array){
        // remove duplicates (to simplify the tree balancing)
        array = array.filter((val, idx, arr) => arr.indexOf(val) === idx);
        
        // sort the array using the sort() method
        // its complexity depends on the implementation
        // however, you can expect O(n log(n)) if using Mergesort	
        array.sort((a,b) => a-b);

        return this.#buildTreeFromSortedArray(array,0,array.length-1);
    }

    #buildTreeFromSortedArray(array,start,end){
        if (start > end)
            return null;

        let mid = Math.ceil((start + end) / 2);

        let root = new Node(array[mid]);
        root.left = this.#buildTreeFromSortedArray(array,start,mid-1);
        root.right = this.#buildTreeFromSortedArray(array,mid+1,end);

        return root;
    }

    // The following method has been adapted from the function in 
    // https://www.theodinproject.com/lessons/javascript-binary-search-trees
    prettyPrint(node = this.#root, prefix = "", isLeft = true){
        if (node === null) {
          return;
        }
        if (node.right !== null) {
          this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
        if (node.left !== null) {
          this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
    }
}