import { NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Usuario } from '../models/usuario';
import { Socket } from 'socket.io';

export interface CustomSocket extends Socket {
    decoded?: string
}

export function jwtMiddleware(socket: CustomSocket, next: NextFunction, data: { token?: string }) {
    const token = data.token;

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.SECRETORPRIVATEKEY!) as PayloadJwt
            socket.decoded = decoded.uid
            next();
        } catch (err) {
            console.log(err);
            socket.disconnect(true);
            next();
        }
    } else {
        socket.disconnect(true);
        next();
    }
}


export const comprobarJWT = async (token: any) => {
    try {
        if (token.length < 10) {
            return null;
        }

        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY!) as JwtPayload;
        const usuario = await Usuario.findById(uid);

        return usuario

    } catch (error) {
        return null;
    }

}
