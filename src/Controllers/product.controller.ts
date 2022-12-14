import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { productService } from "../Services/product.service";

const _productService = new productService();

export class productController {
    async getAll(req: Request, res: Response) {
        const response = await _productService.getAll();
        if (response.success) res.status(200).json(response);
        else res.status(500).json(response);
    }
    async getById(req: Request, res: Response) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ error: errors.array() });
            return;
        }
        const response = await _productService.getById(req);
        if (response.success) res.status(200).json(response);
        else res.status(404).json(response);
    }
    async getByCatId(req: Request, res: Response) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ error: errors.array() });
            return;
        }
        const response = await _productService.getByCatId(req);
        if (response.success) res.status(200).json(response);
        else res.status(404).json(response);
    }
    async createProduct(req: Request, res: Response) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ error: errors.array() });
            return;
        }
        const response = await _productService.createProduct(req);
        if (response.success) res.status(201).json(response);
        else res.status(500).json(response);
    }
    async updateProduct(req: Request, res: Response) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ error: errors.array() });
            return;
        }
        const response = await _productService.updateProduct(req);
        if (response.success) res.status(200).json(response);
        else res.status(500).json(response);
    }
    async deleteProduct(req: Request, res: Response) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ error: errors.array() });
            return;
        }
        const response = await _productService.deleteProduct(req);
        if (response.success) res.status(200).json(response);
        else res.status(500).json(response);
    }
}