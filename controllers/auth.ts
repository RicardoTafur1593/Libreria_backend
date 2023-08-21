import { response, request } from "express";
import bcryptjs from 'bcryptjs';
import { Usuario } from "../models/usuario";
import { generarJWT } from '../helpers/generar-jwt';

export const login = async(req = request, res = response) => {

    const { correo, password } = req.body;

    try {
        
        //Verificar si el email existe
        const usuario = await Usuario.findOne({ correo });
        if(!usuario) {
            return res.status(400).json({
                msg:'Usuario / Password no son correctos - correo'
            });
        };

        //Si el usuario esta activo BD
        if(!usuario.estado) {
            return res.status(400).json({
                msg:'Usuario / Password no son correctos - estado: false'
            });
        };

        //Verificar la contraseña
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if(!validPassword) {
            return res.status(400).json({
                msg:'Usuario / Password no son correctos - password'
            });
        };

        //Generar el JWT
        const token = await generarJWT(usuario.id);
        res.json({
            usuario,
            token,
            ok:true
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg:'Hable con el administrador'
        });
    };
}


export const revalidarToken =  async(req = request, res = response) => {

    const { _id } = (req as any).usuario;

    // //Leer la base de datos
    const usuario = await Usuario.findById(_id);
    
    // //Generar el JWT
    const token = await generarJWT(_id);

    return res.json({
        _id,
        nombre: usuario!.nombre,
        correo: usuario!.correo,
        rol: usuario!.rol,
        token,
        ok: true
    });
}