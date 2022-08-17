import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { userService } from "../Services/user.service";

const _userService = new userService();

export class userController {

    async getAll(req: Request, res: Response) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ error: errors.array() });
            return;
        }
        const response = await _userService.getAll();
        if (response.success) res.status(200).json(response);
        else res.status(500).json(response);
    }
    async getById(req: Request, res: Response) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ error: errors.array() });
            return;
        }
        const response = await _userService.getById(req);
        if (response.success) res.status(200).json(response);
        else res.status(404).json(response);
    }
    async getByRoleId(req: Request, res: Response) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ error: errors.array() });
            return;
        }
        const response = await _userService.getByRoleId(req);
        if (response.success) res.status(200).json(response);
        else res.status(404).json(response);
    }
    async createUser(req: Request, res: Response) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ error: errors.array() });
            return;
        }
        const response = await _userService.createUser(req);
        if (response.success) res.status(201).json(response);
        else res.status(400).json(response);
    }
    async updateUser(req: Request, res: Response) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ error: errors.array() });
            return;
        }
        const response = await _userService.updateUser(req);
        if (response.success) res.status(200).json(response);
        else res.status(500).json(response);
    }
    async deleteUser(req: Request, res: Response) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ error: errors.array() });
            return;
        }
        const response = await _userService.deleteUser(req);
        if (response.success) res.status(200).json(response);
        else res.status(500).json(response);
    }
    async login(req: Request, res: Response) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ error: errors.array() });
            return;
        }
        const response = await _userService.login(req);
        if (response.success) res.status(200).json(response);
        else res.status(401).json(response);
    }
}