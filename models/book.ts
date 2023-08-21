import mongoose from "mongoose";
import { Books } from '../interface/books';
import { Author } from "./author";

const BookSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    sku: {
        type: Number,
        required: true,
        unique:true
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author',
        required: true
    },
    precio: { type: Number, default: 0 },
    disponibilidad: { type: Boolean, default: true },//En Stock(1) o No Stock(0)
    sinopsis: { type: String },
});

BookSchema.methods.toJSON = function() {
    const { __v, ...data } = this.toObject();
    return data;
};
  

const Book = mongoose.model<Books>('Book', BookSchema);
export { Book };