import express from "express";
import { roleController } from "../Controllers/role.controller";
import authenticate from '../Middlewares/authenticate'
    
    const roleRoute = express.Router();
    const _roleController = new roleController();

    roleRoute.get('/', authenticate, _roleController.getAll);

    roleRoute.get('/:id', _roleController.getById);

    roleRoute.post('/', _roleController.createRole);

    roleRoute.put('/', _roleController.updateRole);

    roleRoute.delete('/:id', _roleController.deleteRole);

export default roleRoute

