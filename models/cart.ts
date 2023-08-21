import mongoose from "mongoose";
import { Cart } from "../interface/cart";


const CartSchema = new mongoose.Schema({
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    estado: {
        type: Boolean,
        default: true
    }
})

CartSchema.methods.toJSON = function() {
    const { __v, ...data } = this.toObject();
    return data;
};

const Cart = mongoose.model<Cart>('Cart', CartSchema);
export { Cart }