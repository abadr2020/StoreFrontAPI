import supertest from "supertest";
import app from "../../app";
import { user } from "../../Models/user.model";
import jwt from "jsonwebtoken";

const request = supertest(app);
const preservedtoken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjEsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE2NjA1OTc2Mjh9.njgUY44d4ZvcEK-beMxjfUBzK_FO-8MyiOLl5PW8Af4';   //username: admin, password: P@ssw0rd
let roleid: number;
let usertoken: string;
let _user: user;


describe("Store Front users Endpoints", () => {
    beforeAll(async () => {
        const role = await request.post("/api/role")
            .set('Authorization', 'bearer ' + preservedtoken)
            .send({ "rolename": "Users" })

        roleid = role?.body.Data.id as number;
    })
    it('createusers endpoint should create users', async () => {
        _user = {
            "firstname": "Ahmed",
            "lastname": "Badr",
            "username": "abadr",
            "password": "P@ssw0rd123",
            roleid
        }
        const response = await request.post('/api/user/register')
            .send(_user)
        usertoken = response.body.Data;
        const { userid } = jwt.decode(usertoken) as jwt.JwtPayload
        _user.id = userid;
        expect(response.body.Data).toEqual(usertoken);
    });
    it('updateusers endpoint should update users', async () => {
        _user.lastname = "Badr Khamis";
        const response = await request.put('/api/user')
            .set('Authorization', 'bearer ' + usertoken)
            .send(_user)
        const { userid } = jwt.decode(usertoken) as jwt.JwtPayload
        usertoken = response.body.Data;
        expect(response.body.Data).toEqual(usertoken);
    });
    it('getById endpoint should get user by id', async () => {
        const response = await request.get('/api/user/' + _user.id)
            .set('Authorization', 'bearer ' + usertoken)
        _user.password = response.body.Data.password
        expect(response.body.Data).toEqual(_user);
    });
    it('getByRoleId endpoint should get users by roleid', async () => {
        const response = await request.get('/api/user/getallbyrole/' + _user.roleid)
            .set('Authorization', 'bearer ' + preservedtoken)
        const users = response.body.Data as user[]
        const user = users.filter(r => r.id == _user.id)
        _user.password = user[0].password;
        expect(user).toEqual([_user]);
    });
    it('getAll endpoint should get All users', async () => {
        const response = await request.get('/api/user')
            .set('Authorization', 'bearer ' + preservedtoken)
        const users = response.body.Data as user[]
        const user = users.filter(r => r.id == _user.id)
        expect(user).toEqual([_user]);
    });
    it('Login endpoint should get user by id', async () => {
        const response = await request.post('/api/user/login')
            .send({
                "username": "admin",
                "password": "P@ssw0rd"
            })
        usertoken = response.body.Data;
        expect(response.body.Data).toEqual(usertoken);
    });
    it('deleteusers endpoint should delete users', async () => {
        const response = await request.delete('/api/user/' + _user.id)
            .set('Authorization', 'bearer ' + preservedtoken)
        expect(response.body.Data).toEqual(_user);
    });
    afterAll(async () => {
        await request.delete('/api/role/' + roleid)
            .set('Authorization', 'bearer ' + preservedtoken)
    })
});


