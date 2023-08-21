import mongoose from "mongoose";
import { Authors } from "../interface/authors";

const AuthorSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
    // books: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Book',
    //     required: true
    // }
});

AuthorSchema.methods.toJSON = function() {
    const { __v, ...data } = this.toObject();
    return data;
};

const Author = mongoose.model<Authors>('Author', AuthorSchema);
export { Author };