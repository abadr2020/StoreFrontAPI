import { responseObject } from "../Models/responseObject.model";
import { order } from "../Models/order.model";
import { orderRepo } from "../Repositories/order.repo";
import { Request } from "express";


const _orderRepo = new orderRepo();

export class orderService{
    async getAll(): Promise<responseObject>{
        try {
            const orders = await _orderRepo.getAll();
            const responseObj: responseObject = {};
            if(orders) {
                responseObj.Data =orders
                responseObj.success= true
            } else {
                responseObj.success= false;
            }
            return responseObj; 
        } catch (error) {
            const responseObj: responseObject = {
                success: false
            }
            responseObj.ErrorMessages?.push(error as string);
            return responseObj;
        }
    }
    async getById(req: Request){
        try{
            const { id } = req.params;
            const order = await _orderRepo.getById(parseInt(id));
            const responseObj: responseObject = {};
            if(order) {
                responseObj.Data =order
                responseObj.success= true
            } else {
                responseObj.success= false;
            }
            return responseObj;         
        } catch (error) {
            const responseObj: responseObject = {
                success: false
            }
            responseObj.ErrorMessages?.push(error as string);
            return responseObj;
        }
    }
    async createOrder(req: Request){
        try{
            const order: order = req.body;
            const createdOrder = await _orderRepo.createOrder(order);
            const responseObj: responseObject = {};
            if(createdOrder) {
                responseObj.Data =createdOrder
                responseObj.success= true
            } else {
                responseObj.success= false;
            }
            return responseObj;         
        } catch (error) {
            const responseObj: responseObject = {
                success: false
            }
            responseObj.ErrorMessages?.push(error as string);
            return responseObj;
        }
    }
    async updateOrder(req: Request){
        try{
            const order: order = req.body;
            const updatedOrder = await _orderRepo.updateOrder(order);
            const responseObj: responseObject = {};
            if(updatedOrder) {
                responseObj.Data =updatedOrder
                responseObj.success= true
            } else {
                responseObj.success= false;
            }
            return responseObj;        
        } catch (error) {
            const responseObj: responseObject = {
                success: false
            }
            responseObj.ErrorMessages?.push(error as string);
            return responseObj;
        }

    }
    async deleteOrder(req: Request){
        try{
            const { id } = req.params;
            const order = await _orderRepo.deleteOrder(parseInt(id));
            const responseObj: responseObject = {};
            if(order) {
                responseObj.Data =order
                responseObj.success= true
            } else {
                responseObj.success= false;
            }
            return responseObj;         
         } catch (error) {
            const responseObj: responseObject = {
                success: false
            }
            responseObj.ErrorMessages?.push(error as string);
            return responseObj;
        }

    }
}