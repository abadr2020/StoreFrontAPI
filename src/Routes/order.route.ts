import express from "express";
import { orderController } from "../Controllers/order.controller";
    
    const orderRoute = express.Router();
    const _orderController = new orderController();

    orderRoute.get('/', _orderController.getAll);

    orderRoute.get('/:id', _orderController.getById);

    orderRoute.post('/', _orderController.createOrder);

    orderRoute.put('/', _orderController.updateOrder);

    orderRoute.delete('/:id', _orderController.deleteOrder);

export default orderRoute