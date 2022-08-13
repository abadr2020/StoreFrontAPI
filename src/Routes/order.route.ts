import express from "express";
import { orderController } from "../Controllers/order.controller";
import authorizeAdmin from "../Middlewares/authorizeAdmin";
    
    const orderRoute = express.Router();
    const _orderController = new orderController();

    orderRoute.get('/',authorizeAdmin,_orderController.getAll);

    orderRoute.get('/:id',_orderController.getById);

    orderRoute.get('/:userid',_orderController.getAllByUserId);

    orderRoute.post('/',_orderController.createOrder);

    orderRoute.put('/',_orderController.updateOrder);

    orderRoute.delete('/:id',_orderController.deleteOrder);

export default orderRoute