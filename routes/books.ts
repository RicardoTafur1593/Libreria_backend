import { Router } from 'express';
import { check } from 'express-validator';
import { deleteBook, findBookID, findBooks, postBook, putBook } from '../controllers/books';
import { validarCampos } from '../middlewares/validar-campos';
import { validarJWT } from '../middlewares/validar-jwt';
import { existeAuthorPorId, existeBookPorID } from '../helpers/db-validators';


const router = Router();

router.get('/', findBooks);

router.get('/:id', [
    validarJWT,
    check('id', 'No es un id de mongo valido').isMongoId(),
    check('id').custom(existeBookPorID),
    validarCampos,
], findBookID);

router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('sku', 'El codigo SKU es obligatorio').not().isEmpty(),
    check('sku', 'El codigo SKU tiene que ser de 8 caracteres').isLength({min:8, max:8}),
    check('author', 'No es un mongo ID').isMongoId(),
    check('author').custom(existeAuthorPorId),
    validarCampos
], postBook);


router.put('/:id', [
    validarJWT,
    check('id').custom(existeBookPorID),
    validarCampos
], putBook);


router.delete('/:id', [
    validarJWT,
    check('id', 'No es un id de mongo valido').isMongoId(),
    validarCampos,
    check('id').custom(existeBookPorID),
    validarCampos
],deleteBook);


export default router
