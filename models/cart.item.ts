import mongoose from "mongoose";
import { CartItem } from "../interface/cart";


const CartItemSchema = new mongoose.Schema({
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart',
        required: true
    },
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    cantidad: {
        type: Number,
        default: 1
    },
})


CartItemSchema.methods.toJSON = function() {
    const { __v, ...data } = this.toObject();
    return data;
};

const CartItem = mongoose.model<CartItem>('CartItem', CartItemSchema);
export { CartItem }