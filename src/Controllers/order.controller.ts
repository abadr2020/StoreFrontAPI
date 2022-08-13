import {  Request, Response} from "express";
import { orderService } from "../Services/order.service";

const _orderService = new orderService();

export class orderController{

    async getAll(req: Request,res: Response){
        const response = await _orderService.getAll();
        if (response.success) res.status(200).json(response);
        else res.status(500).json(response);
   }
    async getAllByUserId(req: Request,res: Response){
        const response = await _orderService.getAllByUserId(req);
        if (response.success) res.status(200).json(response);
        else res.status(500).json(response);
    }
    async getById(req: Request,res: Response){
        const response = await _orderService.getById(req);
        if (response.success) res.status(200).json(response);
        else res.status(404).json(response);
    }
    async createOrder(req: Request,res: Response){
        const response = await _orderService.createOrder(req);
        if (response.success) res.status(201).json(response);
        else res.status(500).json(response);
    }
    async updateOrder(req: Request,res: Response){
        const response = await _orderService.updateOrder(req);
        if (response.success) res.status(200).json(response);
        else res.status(500).json(response);
    }
    async deleteOrder(req: Request, res: Response){
        const response = await _orderService.deleteOrder(req);
        if (response.success) res.status(200).json(response);
        else res.status(500).json(response);
    }
}