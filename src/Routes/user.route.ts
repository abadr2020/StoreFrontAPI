import express from "express";
import { userController } from "../Controllers/user.controller";
import authenticate from "../Middlewares/authenticate";
import authorizeAdmin from "../Middlewares/authorizeAdmin";
import authorizeUser from "../Middlewares/authorizeUser";
    
    const userRoute = express.Router();
    const _userController = new userController();

    userRoute.get('/',authorizeAdmin,_userController.getAll);

    userRoute.get('/:id',authenticate,_userController.getById);

    userRoute.get('/:roleid',authorizeAdmin,_userController.getByRoleId);

    userRoute.post('/register',_userController.createUser);

    userRoute.put('/', authorizeUser, _userController.updateUser);

    userRoute.delete('/:id',authorizeAdmin,_userController.deleteUser);

    userRoute.post('/login', _userController.login);

export default userRoute