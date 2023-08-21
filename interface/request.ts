import { Request } from 'express';
import { Usuario } from './usuarios';

export interface CustomRequest extends Request {
    usuario?: Usuario;
}