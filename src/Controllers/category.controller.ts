import {  Request, Response} from "express";
import { categoryService } from "../Services/category.service";

const _categoryService = new categoryService();

export class categoryController{
    async getAll(req: Request,res: Response){
        const response = await _categoryService.getAll();
        if (response.success) res.status(200).json(response);
        else res.status(500).json(response);
   }
    async getById(req: Request,res: Response){
        const response = await _categoryService.getById(req);
        if (response.success) res.status(200).json(response);
        else res.status(404).json(response);
    }
    async createCategory(req: Request,res: Response){
        const response = await _categoryService.createCategory(req);
        if (response.success) res.status(201).json(response);
        else res.status(500).json(response);
    }
    async updateCategory(req: Request,res: Response){
        const response = await _categoryService.updateCategory(req);
        if (response.success) res.status(200).json(response);
        else res.status(500).json(response);
    }
    async deleteCategory(req: Request, res: Response){
        const response = await _categoryService.deleteCategory(req);
        if (response.success) res.status(200).json(response);
        else res.status(500).json(response);
    }
}