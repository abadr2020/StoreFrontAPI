import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import appConfig from "../app.config";
import { userRepo } from "../Repositories/user.repo";
import { roleid } from "../Utils/Enums";

const authorizeUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorizationHeader = req.headers.authorization;
        const { id } = req.body;
        const jwtSecret = appConfig.jwtSecret
        if (authorizationHeader) {
            const token = authorizationHeader.split(' ')[1]
            const decoded = jwt.verify(token, jwtSecret as string)
            if (!decoded) {
                res.status(401).json('Access denied, invalid token');
            }
            const { username } = decoded as jwt.JwtPayload
            const _userRepo = new userRepo();
            const user = await _userRepo.getByUsername(username as string)
            if (user?.id != id) {
                res.status(401).json('Access denied, Not authorized to perform this action.');
            }
            next()
        } else {
            res.status(401).json('Access denied, invalid token');
        }
    } catch (error) {
        res.status(401).json('Access denied, invalid token')
    }
}

export default authorizeUser;