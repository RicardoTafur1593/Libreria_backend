import { Books } from '../interface/books';




export class SocketCart {
    private cart: Books[];
    
    constructor() {
        this.cart = [];
    }

    get cartShopping() {
        return this.cart
    }

    

}