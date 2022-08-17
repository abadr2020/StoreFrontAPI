import express from "express";
import { productController } from "../Controllers/product.controller";
import * as productValidator from "../Middlewares/Validators/product.validator";

const productRoute = express.Router();
const _productController = new productController();

productRoute.get('/', _productController.getAll);

productRoute.get('/:id', productValidator.validateGetProduct(), _productController.getById);

productRoute.get('/getallbycatid/:catid', productValidator.validateGetProductsByCatId(), _productController.getByCatId);

productRoute.post('/', productValidator.validateCreateProduct(), _productController.createProduct);

productRoute.put('/', productValidator.validateUpdateProduct(), _productController.updateProduct);

productRoute.delete('/:id', productValidator.validateDeleteProduct(), _productController.deleteProduct);

export default productRoute