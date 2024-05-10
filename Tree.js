import Node from './Node.js'

export default class Tree{
    #root = null;

    constructor(array=[]){
        this.#root = this.#buildTree(array);
    }

    // the following method takes an array of data and turns it into a balanced 
    // binary tree full of Node objects appropriately placed
    #buildTree(array){
        // remove duplicates (to simplify the tree balancing)
        array = array.filter((val, idx, arr) => arr.indexOf(val) === idx);
        
        // sort the array using the sort() method
        // its complexity depends on the implementation
        // however, you can expect O(n log(n)) if using Mergesort	
        array.sort((a,b) => a-b);

        // the BSC is built in O(n) using the sorted array data
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

    // the following method inserts the given value
    // such value is inserted as a leaf in the tree, 
    // so that the tree is not rearranged
    insert(data){
        if (this.#root){
            if (this.#root.data !== data)
                this.#insert(data, this.#root);
        } else{
            this.#root = new Node(data);
        }
    }
    // the following method is an helper method for the insert() method
    // the proper subtree is selected and its child node is processed
    #insert(data,node){
        let side = node.getSubtreeSide(data);
        if (node[side]){
            if (node[side].data !== data)
                this.#insert(data, node[side]);
        } else{
            node[side] = new Node(data);
        }
    }
    // Note: the code above is duplicated because an helper function
    //       executing that would need node to be passed by reference, 
    //       and being able to modify the pointed data, which is not 
    //       possible in js


    // the following method returns the node with the given value
    find(data){
        return this.#findProcessNode(data,this.#root);
    }
    // the following method is an helper method for the insert() method
    // the proper subtree is selected and its child node is processed
    #find(data,node){
        let side = node.getSubtreeSide(data);
        return this.#findProcessNode(data,node[side]);
    }
    // the following method process a single node (no need to modify the pointed node)
    #findProcessNode(data,node){
        if (node){
            if (node.data !== data)
                return this.#find(data, node);
            else // node.data === data
                return node;
        } else{
            return null;
        }
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