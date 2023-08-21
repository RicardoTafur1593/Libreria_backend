import { NextFunction, Request, Response } from "express";
import { Book } from "../models/book";
import { PostAuthorsDTO } from "../dtos/postAuthors.dto";
import { Usuario } from "../interface/usuarios";
import AppError from "../common/app-Error";


export const findBooks = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { page = 1, limit = 8 } = req.query;
        const skip = (+page - 1) * +limit; // el + es una forma abreviada de parseInt
        const [total, books] = await Promise.all([
            Book.countDocuments(),
            Book.find().skip(skip).limit(+limit).populate('author'),//populate llena la data en base a una relacion
        ]);

        res.status(200).json({ total, books })

    } catch (error) {
        next(new AppError(400, `el error es : ${error}`))
    }
};

export const findBookID = async (req: Request, res: Response) => {
    const { id } = req.params;
    const book = await Book.findById(id).populate('author', 'nombre');
    res.json(book)
}

export const postBook = async (req: Request, res: Response) => {
    const { nombre, sku, usuario, author, ...body } = req.body;

    const existeBookDB = await Book.findOne({ $or: [{ nombre }, { sku }] });

    if (existeBookDB) {
        if (existeBookDB?.nombre === nombre) {
            return res.status(400).json({
                msg: `El libro: ${existeBookDB?.nombre}, ya existe`
            });
        } else {
            return res.status(400).json({
                msg: `El SKU: ${existeBookDB?.sku}, ya existe`
            });
        }
    };

    const user: Usuario = (req as any).usuario;
    const data: PostAuthorsDTO = {
        ...body,
        author: author,
        nombre: nombre.toUpperCase(),
        sku,
        usuario: user._id
    };

    const book = new Book(data);
    const savedBook = await book.save();
    const populatedBook = await Book.findOne({ _id: savedBook._id }).populate('author')
    res.json(populatedBook);
};

export const putBook = async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = req.body;
    try {
        if (data.nombre) {
            data.nombre = data.nombre.toUpperCase();
        }
        const book = await Book.findByIdAndUpdate(id, data, { new: true }).populate('author');
        res.json(book);

    } catch (error) {
        throw new Error('Error en el ID del Autor')
    }

};

export const deleteBook = async (req: Request, res: Response) => {
    const { id } = req.params;
    const deleteBook = await Book.findByIdAndDelete(id, { new: true })
    res.status(200).json(deleteBook)
}