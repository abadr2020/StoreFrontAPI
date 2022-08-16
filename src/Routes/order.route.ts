import express from "express";
import { orderController } from "../Controllers/order.controller";
import authorizeAdmin from "../Middlewares/authorizeAdmin";
import * as orderValidator from "../Middlewares/Validators/order.validator";

const orderRoute = express.Router();
const _orderController = new orderController();

orderRoute.get('/', authorizeAdmin, _orderController.getAll);

orderRoute.get('/:id', orderValidator.validateGetOrder(), _orderController.getById);

orderRoute.get('/getallbyuser/:userid', orderValidator.validateGetOrderByUserId(), _orderController.getAllByUserId);

orderRoute.post('/', orderValidator.validateCreateOrder(), _orderController.createOrder);

orderRoute.put('/', orderValidator.validateUpdateOrder(), _orderController.updateOrder);

orderRoute.delete('/:id', orderValidator.validateDeleteOrder(), _orderController.deleteOrder);

export default orderRoute
