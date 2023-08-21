import { Usuario } from "./usuarios";
import { Books } from "./books";

export interface Cart {
    _id: string,
    usuario: Usuario['_id'],
    estado: boolean
}

export interface CartItem {
    _id: string,
    usuario: Cart[],
    book: Books[],
    cantidad: number
}
