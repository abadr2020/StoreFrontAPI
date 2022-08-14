import { role } from "../../Models/role.model";
import { roleRepo } from "../../Repositories/role.repo";

const _roleRepo= new roleRepo();
let roleid: number;

describe("Store Front Roles", () => {

    it('should have an getAll method', () => {
        expect(_roleRepo.getAll).toBeDefined();
    });
    it('should have an getById method', () => {
        expect(_roleRepo.getById).toBeDefined();
    });
    it('should have an createRole method', () => {
        expect(_roleRepo.createRole).toBeDefined();
    });
    it('should have an updateRole method', () => {
        expect(_roleRepo.updateRole).toBeDefined();
    });
    it('should have an deleteRole method', () => {
        expect(_roleRepo.deleteRole).toBeDefined();
    });

    it('createRole method should create roles', async () => {
        const newrole: role = {
            "rolename" : "Admin",
        }
        const result = await _roleRepo.createRole(newrole);
        newrole.id = result?.id;
        roleid = newrole.id as number;
        expect(result).toEqual(newrole);
    });
    it('updateRole method should update roles', async () => {
        const updaedrole: role = {
            "id":roleid,
            "rolename" : "Admins"
        }
        const result = await _roleRepo.updateRole(updaedrole);
        expect(result).toEqual(updaedrole);
    });
    it('getAll method should get All roles', async () => {
        const existingrole: role = {
            "id":roleid,
            "rolename" : "Admins"
        }
        const result = await _roleRepo.getAll();
        expect(result).toEqual([existingrole]);
    });
    it('getById method should get role by id', async () => {
        const existingrole: role = {
            "id":roleid,
            "rolename" : "Admins"
        }
        const result = await _roleRepo.getById(roleid);
        expect(result).toEqual(existingrole);
    });
    it('deleteRole method should delete roles', async () => {
        const existingrole: role = {
            "id":roleid,
            "rolename" : "Admins"
        }
        const result = await _roleRepo.deleteRole(roleid);
        expect(result).toEqual(existingrole);
    });
});


