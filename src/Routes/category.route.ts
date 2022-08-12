import express from "express";
import { categoryController } from "../Controllers/category.controller";
    
    const categoryRoute = express.Router();
    const _categoryController = new categoryController();

    categoryRoute.get('/', _categoryController.getAll);

    categoryRoute.get('/:id', _categoryController.getById);

    categoryRoute.post('/', _categoryController.createCategory);

    categoryRoute.put('/', _categoryController.updateCategory);

    categoryRoute.delete('/:id', _categoryController.deleteCategory);

export default categoryRoute