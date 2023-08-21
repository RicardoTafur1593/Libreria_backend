import { Request, Response} from 'express'
import { Usuario } from '../models/usuario';
import { Role } from '../models/role';
import bcryptjs from 'bcryptjs';
import { generarJWT } from '../helpers/generar-jwt';

//Obtener todos los usuarios
export const getUsuarios = async( req: Request ,res: Response ) => {
    const { limit } = req.query;
    const query = { estado: true };

    const [ total, usuarios ] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .limit(Number(limit))
    ]);

    res.json({
        total,
        usuarios
    });
};


//Obtener usuarios por id
export const getUsuario = async( req: Request ,res: Response ) => {
    const { id } = req.params;
    const usuario = await Usuario.findById(id)
    res.json(usuario)
};


//Registrar Usuario
export const postUsuario = async( req: Request ,res: Response ) => {
    
    // try {
        //obtener datos del body
        const { nombre, correo, password, rol } = req.body;
        const usuario = new Usuario({ nombre, correo, password, rol });

        //encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        usuario.password = bcryptjs.hashSync(password, salt);

        //generar token
        const token = await generarJWT(usuario.id)
            
        //guardando db
        await usuario.save();
        res.json({ok:true, usuario, token});
};

//Crear Roles
export const postRoles = async( req: Request ,res: Response ) => {
    try {
        const { rol } = req.body;
        const role = new Role({ rol });
        await role.save();
        res.json(role);
        
    } catch (error) {
        res.status(400).json({
            msg: 'El rol ya existe'
        })
    }
}


//Modificar Usuario por ID
export const putUsuario = async( req: Request ,res: Response ) => {
    const { id } = req.params;
    const { _id, password, correo, ...resto } = req.body;
    if(password) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt); 
    };
    const usuario = await Usuario.findByIdAndUpdate(id, resto, { new: true });
    res.json(usuario)
};


//Eliminar Usuario por ID (Cambiar de estado)
export const deleteUsuario = async( req: Request ,res: Response ) => {
    const { id } = req.params;
    const usuario = await Usuario.findByIdAndUpdate(id, {estado:false}, {new:true});
    res.json(usuario);
};



