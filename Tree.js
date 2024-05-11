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


    // the following method deletes the given value
    // there are four cases:
    // 1) the value is not present: do nothing
    // 2) the node with the value is a leaf: set the leaf as null
    // 3) the node has only one child: replace the node with the child
    // 4) the node has both children: replace the node with the node with the
    //    smallest value in the right subtree (*), and 'remove' the latter 
    //    node (*) as in 3). Note that the node (*) has either no child or the right child    
    delete(data){
        if (this.#root){
            if (this.#root.data !== data)
                this.#delete(data, this.#root);
            else { // node.data === data
                // delete the node this.#root
                if (this.#root.left === null){
                    this.#root = this.#root.right;
                } else {
                    if (this.#root.right === null){
                        // The node to delete has 1 child
                        this.#root = this.#root.left;
                    } else {
                        // find the inorder successor of the node
                        const inorderSuccessor = this.#findInorderSuccessor(this.#root);
                        //console.log(`Successor of ${this.printNode(this.#root)} is ${this.printNode(inorderSuccessor.node)} at the ${inorderSuccessor.side} of ${this.printNode(inorderSuccessor.parent)}`);
                        // delete the inorder successor from the tree
                        // see #delete(data,node) for details
                        inorderSuccessor.parent[inorderSuccessor.side] = inorderSuccessor.node.right;
                        // copy contents (data) of the inorder successor to the node
                        this.#root.data = inorderSuccessor.node.data;
                }
                }
            }
        }
    }
    // the following method is an helper method for the delete() method
    // the proper subtree is selected and its child node is processed
    #delete(data,node){
        let side = node.getSubtreeSide(data);
        if (node[side]){
            if (node[side].data !== data)
                this.#delete(data, node[side]);
            else { // node.data === data
                // delete the node node[side]
                if (node[side].left === null){
                    // There are two cases:
                    // - either the node to delete has no children (node[side].right === null)
                    // - or it has just 1 child (node[side].right)
                    node[side] = node[side].right;
                } else {
                    if (node[side].right === null){
                        // The node to delete has 1 child
                        node[side] = node[side].left;
                    } else {
                        // find the inorder successor of the node
                        const inorderSuccessor = this.#findInorderSuccessor(node[side]);
                        //console.log(`Successor of ${this.printNode(node[side])} is ${this.printNode(inorderSuccessor.node)} at the ${inorderSuccessor.side} of ${this.printNode(inorderSuccessor.parent)}`);
                        // delete the inorder successor from the tree
                        // this has to be done before updating the .left and .right nodes with the older values
                        // indeed, if the inorder successor is node[side].right, it will not be the .right node 
                        // when replacing the node[side] with the inorder successor
                        // You can avoid calling this.#delete(inorderSuccessor.node.data,node[side]);  
                        // and to traverse again part of the tree, as follows
                        inorderSuccessor.parent[inorderSuccessor.side] = inorderSuccessor.node.right;
                        // copy contents (data) of the inorder successor to the node
                        node[side].data = inorderSuccessor.node.data;
                   }
                }
            }
        }
    }
    #findInorderSuccessor(node){
        if (node.right){
            if (node.right.left)
                return this.#findSmallestSuccessor(node.right);
            else
                return ({node: node.right, parent: node,side: 'right'});
        } else {
             return null;
        }
    }
    #findSmallestSuccessor(node){
        // This is to be called by #findInorderSuccessor and by #findSmallestSuccessor itself
        // So, node.left exists by construction
        if (node.left.left)
            return this.#findSmallestSuccessor(node.left);
        else
            return ({node: node.left, parent: node,side: 'left'});
    }


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

    // The following method accepts an optional callback function as its parameter.
    // It traverses the tree in breadth-first level order and provide each node as an argument to the callback.
    // THen, the callback will perform an operation on each node following the order in which they are traversed.
    // The method returns an array of values if no callback is given as an argument.
    levelOrder(callback){
        if (callback){
            this.#levelOrderCallback(callback);
            //this.#levelOrderCallbackRecursive(callback);
        }
        else{
            return this.#levelOrderList();
            //return this.#levelOrderListRecursive();
        }
    }
    #levelOrderCallback(callback){ // iterative approach
        if (!this.#root)
            return;

        let queue = [this.#root];
        while (queue.length){
            //console.log(queue.map(node => this.printNode(node)));
            let node = queue.shift();
            if (node.left)
                queue.push(node.left);
            if (node.right)
                queue.push(node.right);
            callback(node);
        }
    }
    #levelOrderList(){ // iterative approach
        let list = [];
        if (!this.#root)
            return list;

        let queue = [this.#root];
        while (queue.length){
            //console.log(queue.map(node => this.printNode(node)));
            let node = queue.shift();
            if (node.left)
                queue.push(node.left);
            if (node.right)
                queue.push(node.right);
            list.push(node.data);
        }
        return list;
    }
    #levelOrderCallbackRecursive(callback,queue=this.#root?[this.#root]:[]){ // recursive approach
        if (!queue.length)
            return;
        //console.log(queue.map(node => this.printNode(node)));
        let node = queue.shift();
        if (node.left)
            queue.push(node.left);
        if (node.right)
            queue.push(node.right);
        callback(node);
        // recursive call
        this.#levelOrderCallbackRecursive(callback,queue);
    }
    #levelOrderListRecursive(queue=this.#root?[this.#root]:[],list=[]){ // recursive approach
        if (!queue.length)
            return list;
        //console.log(queue.map(node => this.printNode(node)));
        let node = queue.shift();
        if (node.left)
            queue.push(node.left);
        if (node.right)
            queue.push(node.right);
        list.push(node.data);
        // recursive call
        list = this.#levelOrderListRecursive(queue,list);
        return list;
    }

    // The following method accepts an optional callback function as its parameter.
    // It traverses the tree in depth-first order (in-order: left-root-right) and provide each node as an argument to the callback.
    // THen, the callback will perform an operation on each node following the order in which they are traversed.
    // The method returns an array of values if no callback is given as an argument.
    inOrder(callback){
        if (callback){
            this.#inOrderCallbackRecursive(callback);
        }
        else{
            return this.#inOrderListRecursive();
        }
    }
    #inOrderCallbackRecursive(callback,node=this.#root){ // recursive approach
        if (!node)
            return;
        this.#inOrderCallbackRecursive(callback,node.left);
        callback(node);
        this.#inOrderCallbackRecursive(callback,node.right);
    }
    #inOrderListRecursive(node=this.#root,list=[]){ // recursive approach
        if (!node)
            return list;
        
        list = this.#inOrderListRecursive(node.left,list);
        list.push(node.data);
        list = this.#inOrderListRecursive(node.right,list);

        return list;
    }

    // The following method accepts an optional callback function as its parameter.
    // It traverses the tree in depth-first order (pre-order: root-left-right) and provide each node as an argument to the callback.
    // THen, the callback will perform an operation on each node following the order in which they are traversed.
    // The method returns an array of values if no callback is given as an argument.
    preOrder(callback){
        if (callback){
            this.#preOrderCallbackRecursive(callback);
        }
        else{
            return this.#preOrderListRecursive();
        }
    }
    #preOrderCallbackRecursive(callback,node=this.#root){ // recursive approach
        if (!node)
            return;
        callback(node);
        this.#preOrderCallbackRecursive(callback,node.left);
        this.#preOrderCallbackRecursive(callback,node.right);
    }
    #preOrderListRecursive(node=this.#root,list=[]){ // recursive approach
        if (!node)
            return list;
        
        list.push(node.data);
        list = this.#preOrderListRecursive(node.left,list);
        list = this.#preOrderListRecursive(node.right,list);

        return list;
    }

    // The following method accepts an optional callback function as its parameter.
    // It traverses the tree in depth-first order (post-order: left-right-root) and provide each node as an argument to the callback.
    // THen, the callback will perform an operation on each node following the order in which they are traversed.
    // The method returns an array of values if no callback is given as an argument.
    postOrder(callback){
        if (callback){
            this.#postOrderCallbackRecursive(callback);
        }
        else{
            return this.#postOrderListRecursive();
        }
    }
    #postOrderCallbackRecursive(callback,node=this.#root){ // recursive approach
        if (!node)
            return;
        this.#postOrderCallbackRecursive(callback,node.left);
        this.#postOrderCallbackRecursive(callback,node.right);
        callback(node);
    }
    #postOrderListRecursive(node=this.#root,list=[]){ // recursive approach
        if (!node)
            return list;
        
        list = this.#postOrderListRecursive(node.left,list);
        list = this.#postOrderListRecursive(node.right,list);
        list.push(node.data);

        return list;
    }


    // The following method  returns the given node’s height,
    // i.e., the number of edges in the longest path from a given node to a leaf node.
    // If the node is null (eg, if node=tree.find(dataNotInTheTree)), it returns -1
    height(node=this.#root){
        if (!node)
            return -1;
        return Math.max(this.height(node.left), this.height(node.right)) + 1;
    }

    // The following method  returns the given node’s depth,
    // i.e., the number of edges in the path from a given node to the tree’s root node.
    // If the node is null (eg, if node=tree.find(dataNotInTheTree)), it returns -1
    depth(node=this.#root){
        if (!node)
            return -1;

        let data = node.data;
        return this.#depth(data);
    }
    #depth(data, node=this.#root){
        if (node){
            if (node.data !== data){
                let side = node.getSubtreeSide(data);
                return this.#depth(data, node[side]) + 1;
            } else {// node.data === data
                return 0;
            }
        } else {
            return -1;
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

    printNode(node){
        return `'${node ? node.data : node}'`;
    }
}