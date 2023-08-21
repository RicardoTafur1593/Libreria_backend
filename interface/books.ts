import { Document } from "mongoose";
import { Authors } from "./authors";
import { Usuario } from "./usuarios";

export interface Books extends Document  {
    _id: string,
    nombre: string,
    sku: number,
    usuario: Usuario['_id'],
    author: Authors['_id'],
    precio?: number,
    disponibilidad?: boolean,
    sinopsis?: string,
}