import mongoose from "mongoose";
import { Usuario } from "../interface/usuarios";

const UsuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatorio'],
    },
    rol: {
        type: String,
        required: true,
        default: 'USER_ROLE'
    },
    estado: {
        type: Boolean,
        default: true
    },
});

//quitar la constraseña para que no se muestre como respuesta
UsuarioSchema.methods.toJSON = function() {
    const { __v, password, _id, ...usuario } = this.toObject();
    usuario.uid = _id;//capturar el id de mongo
    return usuario;
};

const Usuario = mongoose.model<Usuario>('Usuario', UsuarioSchema);
export { Usuario };