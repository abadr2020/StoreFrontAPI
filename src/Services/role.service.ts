import { role } from "../Models/role.model";
import { roleRepo } from "../Repositories/role.repo";
import { Request } from "express";
import { responseObject } from "../Models/responseObject.model";

const _roleRepo = new roleRepo();

export class roleService{
    async getAll(): Promise<responseObject>{
        try {
            const roles = await _roleRepo.getAll();
            const responseObj: responseObject = {};
            if(roles) {
                responseObj.Data =roles
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
            const role = await _roleRepo.getById(parseInt(id));
            const responseObj: responseObject = {};
            if(role) {
                responseObj.Data =role
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
    async createRole(req: Request){
        try{
            const role: role = req.body;
            const createdRole = await _roleRepo.createRole(role);
            const responseObj: responseObject = {};
            if(createdRole) {
                responseObj.Data =createdRole
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
    async updateRole(req: Request){
        try{
            const role: role = req.body;
            const updatedRole = await _roleRepo.updateRole(role);
            const responseObj: responseObject = {};
            if(updatedRole) {
                responseObj.Data =updatedRole
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
    async deleteRole(req: Request){
        try{
            const { id } = req.params;
            const role = await _roleRepo.deleteRole(parseInt(id));
            const responseObj: responseObject = {};
            if(role) {
                responseObj.Data =role
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