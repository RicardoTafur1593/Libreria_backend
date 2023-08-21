import { Request, Response } from 'express';
import { Author } from '../models/author';
import { PostAuthorsDTO } from '../dtos/postAuthors.dto';
import { Usuario } from '../interface/usuarios';
import { Book } from '../models/book';

export const findAuthors = async (req: Request, res: Response) => {
    const { limit } = req.query;
    const [total, authors] = await Promise.all([
        Author.countDocuments(),
        Author.find().limit(Number(limit))
    ])
    res.json({ total, authors })
};

export const findAuthorForID = async (req: Request, res: Response) => {
    const { id } = req.params;
    const buscarAuthor = await Author.findById(id);
    res.json(buscarAuthor);
};


export const postAuthors = async (req: Request, res: Response) => {
    const nombre: string = req.body.nombre.toUpperCase();
    const authorDB = await Author.findOne({ nombre });

    if (authorDB) {
        return res.status(400).json({
            msg: `El author ${nombre}, ya existe`
        });
    };

    const user: Usuario = (req as any).usuario;
    const data: PostAuthorsDTO = {
        nombre,
        usuario: user.id
    }

    const author = new Author(data);
    await author.save();
    res.status(201).json(author)
};


export const deleteAuthors = async (req: Request, res: Response) => {
    const { id } = req.params;
    const libros = await Book.find({ author: id })
    if (libros.length === 0) {
        const deleteAuthor = await Author.findByIdAndRemove(id);
        return res.json(deleteAuthor)
    } else {
        return res.json({ msg: 'El autor tiene libros registrados' })
    }


};
