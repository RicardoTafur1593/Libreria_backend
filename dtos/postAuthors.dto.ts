import { Usuario } from "../interface/usuarios";
import { Authors } from '../interface/authors';

export interface PostAuthorsDTO {
    nombre: string;
    sku?: number;
    usuario: Usuario;
    author?: Authors;
    precio?: number;
    disponibildiad?: boolean;
    _id?: string;
}