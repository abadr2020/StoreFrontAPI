import express from "express";
import { productController } from "../Controllers/product.controller";
    
    const productRoute = express.Router();
    const _productController = new productController();

    productRoute.get('/', _productController.getAll);

    productRoute.get('/:id', _productController.getById);

    productRoute.post('/', _productController.createProduct);

    productRoute.put('/', _productController.updateProduct);

    productRoute.delete('/:id', _productController.deleteProduct);

export default productRoute