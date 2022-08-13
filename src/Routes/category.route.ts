import express from "express";
import { categoryController } from "../Controllers/category.controller";
import * as categoryValidator from "../Middlewares/Validators/category.validator";
    
    const categoryRoute = express.Router();
    const _categoryController = new categoryController();

    categoryRoute.get('/',_categoryController.getAll);

    categoryRoute.get('/:id', categoryValidator.validateGetCategory(),_categoryController.getById);

    categoryRoute.post('/', categoryValidator.validateCreateCategory(),_categoryController.createCategory);

    categoryRoute.put('/', categoryValidator.validateUpdateCategory(),_categoryController.updateCategory);

    categoryRoute.delete('/:id', categoryValidator.validateDeleteCategory(),_categoryController.deleteCategory);

export default categoryRoute