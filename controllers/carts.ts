import { Response } from "express";
import { Cart } from "../models/cart";
import { Usuario } from "../models/usuario";
import { Book } from "../models/book";
import { CartItem } from "../models/cart.item";
import { CustomRequest } from "../interface/request";


export const findCart = async (req: CustomRequest, res: Response) => {
    const id = req.usuario?._id;
    const userCart = await Cart.findOne({usuario: id, estado: true})
    const bookCart= await CartItem.find({cart: userCart?._id}).populate('book')  
    res.json(bookCart || [])
}

export const finderCreateUser = async (usuarioDb: string) => { 
    const buscarCarritoUsuario = await Cart.findOne({ usuario: usuarioDb, estado:true });
    if (buscarCarritoUsuario) {
        return buscarCarritoUsuario; 
    }
    const cart = new Cart({ usuario: usuarioDb});
    const newCart = await cart.save(); 
    return newCart
}

//esta parte la trabaje con sockets
export const postCart = async (req: CustomRequest, res: Response) => {
    const { book } = req.body;
    const usuarios = req.usuario?._id;
    
    //validar usuario/libro existente
    const usuarioDb = await Usuario.findOne({ _id: usuarios });
    const libroDB = await Book.findOne({_id: book});

    //crear o traer el carrito del usuario
    const carrito = await finderCreateUser(usuarioDb?._id)
       
    const carritoCantidad = await CartItem.find({cart: carrito._id , book: libroDB?._id})
    
    if(carritoCantidad.length === 0) {
        const cartItem = new CartItem({
            cart: carrito?._id,
            book: libroDB?._id
        });    
        await cartItem.save()
        return res.json({msg: 'registrado'})
    } else {
        const updateCantidad = await CartItem.findOne({_id: carritoCantidad});
        const cantidad = {
            _id: updateCantidad?._id,
            cantidad: updateCantidad!.cantidad + 1
        }
        await CartItem.findByIdAndUpdate(updateCantidad?._id, cantidad )
        return res.json({msg: 'cantidad actualizada'})
    }   
}

export const deleteCart = async (req: CustomRequest, res: Response) => {
    const idUsuario = req.usuario?.id
    const buscarCartUsuario = await Cart.findOne({usuario: idUsuario, estado:true})
    await CartItem.deleteMany({cart: buscarCartUsuario?._id})
    await Cart.findByIdAndUpdate(buscarCartUsuario?._id, {estado:false}, {new:true})
    res.json({msg: 'Carrito vacio'})
}