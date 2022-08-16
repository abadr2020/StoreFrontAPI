import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import appConfig from "../app.config";

const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorizationHeader = req.headers.authorization;
        const jwtSecret = appConfig.jwtSecret;
        if (authorizationHeader) {
            const token = authorizationHeader.split(' ')[1]
            const decoded = jwt.verify(token, jwtSecret as string)
            if (!decoded) {
                res.status(401).json('Access denied, invalid token');
            }
            next()
        } else {
            res.status(401).json('Access denied, invalid token');
        }
    } catch (error) {
        res.status(401).json('Access denied, invalid token')
    }
}

export default authenticate;