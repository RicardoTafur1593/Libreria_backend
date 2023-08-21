import { Document } from "mongoose";

export interface Usuario extends Document {
    nombre: string,
    correo: string,
    password: string,
    rol: string,
    estado: boolean
}