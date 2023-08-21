import { Document } from "mongoose";
import { Usuario } from "./usuarios";

export interface Authors extends Document{
    nombre: string;
    usuario: Usuario['_id']
}