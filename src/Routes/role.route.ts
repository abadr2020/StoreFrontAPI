import express from "express";
import { roleController } from "../Controllers/role.controller";
import * as roleValidator from "../Middlewares/Validators/role.validator";
    
    const roleRoute = express.Router();
    const _roleController = new roleController();

    roleRoute.get('/', _roleController.getAll);

    roleRoute.get('/:id',roleValidator.validateGetRole(),_roleController.getById);

    roleRoute.post('/', roleValidator.validateCreateRole(),_roleController.createRole);

    roleRoute.put('/', roleValidator.validateUpdateRole(),_roleController.updateRole);

    roleRoute.delete('/:id', roleValidator.validateDeleteRole(),_roleController.deleteRole);

export default roleRoute

