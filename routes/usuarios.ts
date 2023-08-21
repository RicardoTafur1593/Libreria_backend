import { Router } from 'express';
import { check } from 'express-validator';

import { getUsuarios, 
         getUsuario, 
         postUsuario, 
         putUsuario, 
         deleteUsuario, 
         postRoles} from '../controllers/usuarios';

import { emailExiste, existeUsuarioPorId, validarRol } from '../helpers/db-validators';
import { validarCampos } from '../middlewares/validar-campos';
import { validarJWT } from '../middlewares/validar-jwt';


const router = Router();


router.get('/', getUsuarios);

router.get('/:id', [
    validarJWT,
    check('id', 'No es un ID valido').isMongoId(),
    validarCampos
], getUsuario);


router.post('/',[
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser mas de 6 caracteres').isLength({min:6}),
    check('correo', 'El correo no es válido').isEmail(),
    validarCampos,
    check('correo').custom(emailExiste),
    check('rol').custom(validarRol),
    validarCampos
], postUsuario);

router.post('/roles',[ 
    validarJWT,
    check('rol', 'El rol es obligatorio').not().isEmpty(),
    validarCampos
], postRoles)


router.put('/:id', [
    validarJWT,
    check('id', 'No es un ID valido').isMongoId(),
    validarCampos,
    check('id').custom(existeUsuarioPorId),
    validarCampos
], putUsuario);


router.delete('/:id', [
    validarJWT,
    check('id', 'No es un ID valido').isMongoId(),
    validarCampos,
    check('id').custom(existeUsuarioPorId),
    validarCampos
], deleteUsuario);


export default router;