import { responseObject } from "../Models/responseObject.model";
import { category } from "../Models/category.model";
import { categoryRepo } from "../Repositories/category.repo";
import { Request } from "express";


const _categoryRepo = new categoryRepo();

export class categoryService{
    async getAll(): Promise<responseObject>{
        try {
            const categorys = await _categoryRepo.getAll();
            const responseObj: responseObject = {};
            if(categorys) {
                responseObj.Data =categorys
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
            const category = await _categoryRepo.getById(parseInt(id));
            const responseObj: responseObject = {};
            if(category) {
                responseObj.Data =category
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
    async createCategory(req: Request){
        try{
            const category: category = req.body;
            const createdCategory = await _categoryRepo.createCategory(category);
            const responseObj: responseObject = {};
            if(createdCategory) {
                responseObj.Data =createdCategory
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
    async updateCategory(req: Request){
        try{
            const category: category = req.body;
            const updatedCategory = await _categoryRepo.updateCategory(category);
            const responseObj: responseObject = {};
            if(updatedCategory) {
                responseObj.Data =updatedCategory
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
    async deleteCategory(req: Request){
        try{
            const { id } = req.params;
            const category = await _categoryRepo.deleteCategory(parseInt(id));
            const responseObj: responseObject = {};
            if(category) {
                responseObj.Data =category
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