import express from "express";
import { userController } from "../Controllers/user.controller";
import authenticate from "../Middlewares/authenticate";
import authorizeAdmin from "../Middlewares/authorizeAdmin";
import authorizeUser from "../Middlewares/authorizeUser";
import * as userValidator from "../Middlewares/Validators/user.validator"
    
    const userRoute = express.Router();
    const _userController = new userController();

    userRoute.get('/',authorizeAdmin,_userController.getAll);

    userRoute.get('/:id',userValidator.validateGetUser(),authenticate,_userController.getById);

    userRoute.get('/:roleid',userValidator.validateGetUserByRoleId(),authorizeAdmin,_userController.getByRoleId);

    userRoute.post('/register',userValidator.validateCreateUser(),_userController.createUser);

    userRoute.put('/',userValidator.validateUpdateUser(),authorizeUser, _userController.updateUser);

    userRoute.delete('/:id',userValidator.validateDeleteUser(),authorizeAdmin,_userController.deleteUser);

    userRoute.post('/login',userValidator.validateLogin(),_userController.login);

export default userRoute