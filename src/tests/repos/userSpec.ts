import { user } from "../../Models/user.model";
import { roleRepo } from "../../Repositories/role.repo";
import { userRepo } from "../../Repositories/user.repo";

const _userRepo= new userRepo();
const _roleRepo = new roleRepo();
let roleid: number;
let userid: number;


describe("Store Front Users", () => {

    beforeAll(async () => {
        const role = await _roleRepo.createRole(
            {
                "rolename" : "Users"
            }
        );
        roleid = role?.id as number;
    })

    it('should have an getAll method', () => {
        expect(_userRepo.getAll).toBeDefined();
    });
    it('should have an getById method', () => {
        expect(_userRepo.getById).toBeDefined();
    });
    it('should have an getByRoleId method', () => {
        expect(_userRepo.getByRoleId).toBeDefined();
    });
    it('should have an createUser method', () => {
        expect(_userRepo.createUser).toBeDefined();
    });
    it('should have an updateUser method', () => {
        expect(_userRepo.updateUser).toBeDefined();
    });
    it('should have an deleteUser method', () => {
        expect(_userRepo.deleteUser).toBeDefined();
    });

    it('createUser method should create users', async () => {
        const newuser: user = {
            "firstname":"Ahmed",
            "lastname":"Badr",
            "username" : "abadr",
            "password":"P@ssw0rd123",
            roleid
        }
        const result = await _userRepo.createUser(newuser);
        newuser.id = result?.id;
        userid = newuser.id as number;
        expect(result).toEqual(newuser);
    });
    it('updateUser method should update users', async () => {
        const updaeduser: user =  {
            "id":userid,
            "firstname":"Ahmed",
            "lastname":"Badr",
            "username" : "abadr",
            "password":"P@ssw0rd123",
            roleid
        }
        const result = await _userRepo.updateUser(updaeduser);
        expect(result).toEqual(updaeduser);
    });
    it('getAll method should get All users', async () => {
        const existinguser: user =  {
            "id":userid,
            "firstname":"Ahmed",
            "lastname":"Badr",
            "username" : "abadr",
            "password":"P@ssw0rd123",
            roleid
        }
        const result = await _userRepo.getAll();
        const user = result?.filter(u => u.id == existinguser.id)
        expect(user).toEqual([existinguser]);
    });
    it('getById method should get user by id', async () => {
        const existinguser: user =  {
            "id":userid,
            "firstname":"Ahmed",
            "lastname":"Badr",
            "username" : "abadr",
            "password":"P@ssw0rd123",
            roleid
        }
        const result = await _userRepo.getById(userid);
        expect(result).toEqual(existinguser);
    });
    it('getByRoleId method should get user by role id', async () => {
        const existinguser: user =  {
            "id":userid,
            "firstname":"Ahmed",
            "lastname":"Badr",
            "username" : "abadr",
            "password":"P@ssw0rd123",
            roleid
        }
        const result = await _userRepo.getByRoleId(roleid);
        expect(result).toEqual([existinguser]);
    });
    it('deleteUser method should delete users', async () => {
        const existinguser: user =  {
            "id":userid,
            "firstname":"Ahmed",
            "lastname":"Badr",
            "username" : "abadr",
            "password":"P@ssw0rd123",
            roleid
        }
        const result = await _userRepo.deleteUser(userid);
        expect(result).toEqual(existinguser);
    });
    afterAll(async () => {
        await _roleRepo.deleteRole(roleid);
    })
});


