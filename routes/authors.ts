import { Router } from 'express';
import { check } from 'express-validator';
import { deleteAuthors, findAuthors, 
         findAuthorForID, 
         postAuthors } from '../controllers/authors';
import { validarCampos } from '../middlewares/validar-campos';
import { existeAuthorPorId } from '../helpers/db-validators';
import { validarJWT } from '../middlewares/validar-jwt';



const router = Router();

router.get('/', [
    validarJWT
], findAuthors);

router.get('/:id', [
    validarJWT,
    check('id', 'No es un ID valido').isMongoId(),
    validarCampos
], findAuthorForID);

router.post('/', [
    validarJWT,
    check('nombre', 'Es obligatorio poner el nombre').not().isEmpty(),
    validarCampos
], postAuthors)

router.delete('/:id', [
    validarJWT,
    check('id', 'El id no es de Mongo').isMongoId(),
    validarCampos, //para las siguiente validaciones
    check('id').custom(existeAuthorPorId),
    validarCampos
], deleteAuthors)

export default router;