import express from "express";
import { userController } from "../Controllers/user.controller";
import authorizeUser from "../Middlewares/authorizeUser";
    
    const userRoute = express.Router();
    const _userController = new userController();

    userRoute.get('/', _userController.getAll);

    userRoute.get('/:id', _userController.getById);

    userRoute.get('/:roleid', _userController.getByRoleId);

    userRoute.post('/register', _userController.createUser);

    userRoute.put('/', authorizeUser, _userController.updateUser);

    userRoute.delete('/:id', _userController.deleteUser);

    userRoute.post('/login', _userController.login);

export default userRoute