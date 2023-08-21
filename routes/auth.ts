import { Router } from "express";
import { check } from 'express-validator';
import { validarCampos } from '../middlewares/validar-campos';
import { login, revalidarToken } from '../controllers/auth';
import { validarJWT } from "../middlewares/validar-jwt";

const router = Router();

router.post('/login', [
    check('correo','El correo es obligatorio').isEmail(),
    check('password','La constraseña es obligatoria').not().isEmpty(),
    validarCampos
], login);

router.get('/renew', validarJWT, revalidarToken);

export default router;