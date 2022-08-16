import { responseObject } from "../Models/responseObject.model";
import { user } from "../Models/user.model";
import { userRepo } from "../Repositories/user.repo";
import { Request } from "express";
import bcrypt from 'bcrypt';
import appConfig from "../app.config";
import jwt from "jsonwebtoken";

const _userRepo = new userRepo();

export class userService {
    public salt = Number(appConfig.saltRounds);
    public pepper = appConfig.pepper;
    public jwtSecret = appConfig.jwtSecret;
    async getAll(): Promise<responseObject> {
        try {
            const users = await _userRepo.getAll();
            const responseObj: responseObject = {};
            if (users) {
                responseObj.Data = users
                responseObj.success = true
            } else {
                responseObj.success = false;
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
    async getById(req: Request) {
        try {
            const { id } = req.params;
            const user = await _userRepo.getById(parseInt(id));
            const responseObj: responseObject = {};
            if (user) {
                responseObj.Data = user
                responseObj.success = true
            } else {
                responseObj.success = false;
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
    async getByRoleId(req: Request) {
        try {
            const { roleid } = req.params;
            const user = await _userRepo.getByRoleId(parseInt(roleid));
            const responseObj: responseObject = {};
            if (user) {
                responseObj.Data = user
                responseObj.success = true
            } else {
                responseObj.success = false;
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
    async createUser(req: Request) {
        try {
            const user: user = req.body;
            const hash = bcrypt.hashSync(user.password + this.pepper, this.salt);
            user.password = hash;
            const createdUser = await _userRepo.createUser(user);
            const responseObj: responseObject = {};
            if (createdUser) {
                const tokenPayload = {
                    userid: createdUser.id,
                    username: createdUser.username
                }
                const token = jwt.sign(tokenPayload, this.jwtSecret as jwt.Secret)
                responseObj.Data = token
                responseObj.success = true
            } else {
                responseObj.success = false;
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
    async updateUser(req: Request) {
        try {
            const user: user = req.body;
            const hash = bcrypt.hashSync(user.password + this.pepper, this.salt);
            user.password = hash;
            const updatedUser = await _userRepo.updateUser(user);
            const responseObj: responseObject = {};
            if (updatedUser) {
                const tokenPayload = {
                    userid: updatedUser.id,
                    username: updatedUser.username
                }
                const token = jwt.sign(tokenPayload, this.jwtSecret as jwt.Secret)
                responseObj.Data = token
                responseObj.success = true
            } else {
                responseObj.success = false;
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
    async deleteUser(req: Request) {
        try {
            const { id } = req.params;
            const user = await _userRepo.deleteUser(parseInt(id));
            const responseObj: responseObject = {};
            if (user) {
                responseObj.Data = user
                responseObj.success = true
            } else {
                responseObj.success = false;
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
    async login(req: Request) {
        try {
            const { username, password } = req.body;
            const user = await _userRepo.getByUsername(username);
            const responseObj: responseObject = {
                success: false
            };
            if (user) {
                if (bcrypt.compareSync(password + this.pepper, user.password)) {
                    const tokenPayload = {
                        userid: user.id,
                        username: user.username
                    }
                    const token = jwt.sign(tokenPayload, this.jwtSecret as jwt.Secret)
                    responseObj.Data = token
                    responseObj.success = true
                }
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