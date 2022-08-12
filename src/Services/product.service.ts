import { responseObject } from "../Models/responseObject.model";
import { product } from "../Models/product.model";
import { productRepo } from "../Repositories/product.repo";
import { Request } from "express";


const _productRepo = new productRepo();

export class productService{
    async getAll(): Promise<responseObject>{
        try {
            const products = await _productRepo.getAll();
            const responseObj: responseObject = {};
            if(products) {
                responseObj.Data =products
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
            const product = await _productRepo.getById(parseInt(id));
            const responseObj: responseObject = {};
            if(product) {
                responseObj.Data =product
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
    async createProduct(req: Request){
        try{
            const product: product = req.body;
            const createdProduct = await _productRepo.createProduct(product);
            const responseObj: responseObject = {};
            if(createdProduct) {
                responseObj.Data =createdProduct
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
    async updateProduct(req: Request){
        try{
            const product: product = req.body;
            const updatedProduct = await _productRepo.updateProduct(product);
            const responseObj: responseObject = {};
            if(updatedProduct) {
                responseObj.Data =updatedProduct
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
    async deleteProduct(req: Request){
        try{
            const { id } = req.params;
            const product = await _productRepo.deleteProduct(parseInt(id));
            const responseObj: responseObject = {};
            if(product) {
                responseObj.Data =product
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