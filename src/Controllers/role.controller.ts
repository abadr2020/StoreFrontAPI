import { Request, response, Response } from "express";
import { validationResult } from "express-validator";
import { roleService } from "../Services/role.service";

const _roleService = new roleService();

export class roleController {
    async getAll(req: Request, res: Response) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ error: errors.array() });
            return;
        }
        const response = await _roleService.getAll();
        if (response.success) res.status(200).json(response);
        else res.status(500).json(response);
    }
    async getById(req: Request, res: Response) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ error: errors.array() });
            return;
        }
        const response = await _roleService.getById(req);
        if (response.success) res.status(200).json(response);
        else res.status(404).json(response);
    }
    async createRole(req: Request, res: Response) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ error: errors.array() });
            return;
        }
        const response = await _roleService.createRole(req);
        if (response.success) res.status(201).json(response);
        else res.status(500).json(response);
    }
    async updateRole(req: Request, res: Response) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ error: errors.array() });
            return;
        }
        const response = await _roleService.updateRole(req);
        if (response.success) res.status(200).json(response);
        else res.status(500).json(response);
    }
    async deleteRole(req: Request, res: Response) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ error: errors.array() });
            return;
        }
        const response = await _roleService.deleteRole(req);
        if (response.success) res.status(200).json(response);
        else res.status(500).json(response);
    }
}