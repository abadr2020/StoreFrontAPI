import supertest from "supertest";
import app from "../../app";
import { role } from "../../Models/role.model";

const request = supertest(app);
const preservedtoken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjEsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE2NjA1OTc2Mjh9.njgUY44d4ZvcEK-beMxjfUBzK_FO-8MyiOLl5PW8Af4';   //username: admin, password: P@ssw0rd
let _role: role = {
    "rolename": "Users",
}

describe("Store Front roles Endpoints", () => {

    it('createroles endpoint should create roles', async () => {
        const response = await request.post('/api/role')
            .set('Authorization', 'bearer ' + preservedtoken)
            .send(_role)
        _role.id = response.body.Data.id
        expect(response.body.Data).toEqual(_role);
    });
    it('updateroles endpoint should update roles', async () => {
        const response = await request.put('/api/role')
            .set('Authorization', 'bearer ' + preservedtoken)
            .send(_role)
        expect(response.body.Data).toEqual(_role);
    });
    it('getAll endpoint should get All roles', async () => {
        const response = await request.get('/api/role')
            .set('Authorization', 'bearer ' + preservedtoken)
        const roles = response.body.Data as role[]
        const role = roles.filter(r => r.id == _role.id)
        expect(role).toEqual([_role]);
    });
    it('getById endpoint should get role by id', async () => {
        const response = await request.get('/api/role/' + _role.id)
            .set('Authorization', 'bearer ' + preservedtoken)
        expect(response.body.Data).toEqual(_role);
    });
    it('deleteroles endpoint should delete roles', async () => {
        const response = await request.delete('/api/role/' + _role.id)
            .set('Authorization', 'bearer ' + preservedtoken)
        expect(response.body.Data).toEqual(_role);
    });
});


