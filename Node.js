export default class Node{
    #data = null;
    #left = null;  // left child node
    #right = null; // right child node

    constructor(data=null, left=null, right=null){
        this.#data = data;
        this.#left = left;
        this.#right = right;
    }

    set data(value){
        this.#data = value;
    }
    get data(){
        return this.#data;
    }

    set left(value){
        this.#left = value;
    }
    get left(){
        return this.#left;
    }

    set right(value){
        this.#right = value;
    }
    get right(){
        return this.#right;
    }

    getSubtreeSide(data){
        return data < this.#data ? 'left' : data > this.#data ? 'right' : null;
    }
}
