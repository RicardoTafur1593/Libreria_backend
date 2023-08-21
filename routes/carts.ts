import { Router } from "express";
import { deleteCart, findCart, postCart } from "../controllers/carts";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos";
import { validarJWT } from "../middlewares/validar-jwt";


const router = Router();

router.get('/', [
    validarJWT,
], findCart);

router.post('/', [
    validarJWT,
    check('book', 'El ID del book es obligatorio ').not().isEmpty(),
    check('book', 'El ID no es valido').isMongoId(),
    validarCampos
], postCart);

router.delete('/', [
    validarJWT,
    validarCampos
], deleteCart);


export default router
