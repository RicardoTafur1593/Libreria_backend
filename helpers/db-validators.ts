import { Author } from "../models/author";
import { Book } from "../models/book";
import { Role } from "../models/role";
import { Usuario } from "../models/usuario";

export const emailExiste = async(correo = '') => {
    const existeEmail = await Usuario.findOne({ correo: correo});
    if (existeEmail) {
        throw new Error(`El correo ${correo} ya esta registrado`)
    }
};

export const validarRol = async(rol: string) => {
    if(!rol?.trim())  return rol = 'USER_ROLE';
    const existeRol = await Role.findOne({rol: rol});    
    if(!existeRol) {
        throw new Error(`El rol ${rol} no esta registrado en la base de datos`)
    };
};

export const existeUsuarioPorId = async(id:string) => {
    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario) {
        throw new Error(`El ID ${id} no existe`)
    };
};

export const existeAuthorPorId = async(id:string) => {
    const existeAuthor = await Author.findById(id);
    if (!existeAuthor) {
        throw new Error(`El ID ${id} no existe`)
    };
};

export const existeBookPorID = async(id:string) => {
    const existeBook = await Book.findById(id);
    if (!existeBook) {
        throw new Error(`El ID ${id} no existe`)
    };
};
