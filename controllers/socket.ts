import { Server, Socket } from "socket.io";
import { comprobarJWT } from '../middlewares/validar-jwt-socket';
import { Book } from "../models/book";
import { CartItem } from "../models/cart.item";
import { Books } from '../interface/books';
import { finderCreateUser } from "./carts";
import { Cart } from "../models/cart";

export const socketCarrito = async(socket: Socket, io: Server) => {

    const usuario = await comprobarJWT(socket.handshake.headers.token)
    if (!usuario) {
        return socket.disconnect();
    }
    socket.join(usuario._id.toString());
    
    socket.on('agregarCarrito', async (book: Books) => {
        const libroDB = await Book.findOne({ _id: book._id }); 

        //crear o traer el carrito del usuario
        const carrito = await finderCreateUser(usuario._id)
        const carritoCantidad = await CartItem.findOne({ cart: carrito._id, book: libroDB?._id })

        if (carritoCantidad === null) {
                const cartItem = new CartItem({
                cart: carrito?._id,
                book: libroDB?._id,
            });
            const nuevoItemCreado = await (await cartItem.save()).populate('book')
            io.to(usuario._id.toString()).emit('itemAgregado', nuevoItemCreado)
        } else {
            const nuevoItemAgregado = await CartItem.findByIdAndUpdate(carritoCantidad._id, { cantidad: carritoCantidad.cantidad + 1 }, { new: true }).populate('book')
            io.to(usuario._id.toString()).emit('itemAgregado', nuevoItemAgregado);
        }
    })

    socket.on('deleteCart', async () => {
        const buscarCartUsuario = await Cart.findOne({usuario: usuario._id, estado:true})
        await CartItem.deleteMany({cart: buscarCartUsuario?._id})
        await Cart.findByIdAndUpdate(buscarCartUsuario?._id, {estado:false}, {new:true})
        io.to(usuario._id.toString()).emit('carritoVacio')
    })

    socket.on('removeItem', async (libro: Books) => {
        const getCart = await Cart.findOne({usuario: usuario._id, estado:true});
        const getCartItem = await CartItem.findOne({cart: getCart?._id, book: libro._id})
        await CartItem.deleteOne({_id: getCartItem?._id})
        io.to(usuario._id.toString()).emit('itemDelete', libro)
    })

};


