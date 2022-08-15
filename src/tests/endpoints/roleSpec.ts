import supertest from "supertest";
import app from "../../app";
import { role } from "../../Models/role.model";

const request = supertest(app);
const preservedtoken= 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjEsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE2NjA1OTc2Mjh9.njgUY44d4ZvcEK-beMxjfUBzK_FO-8MyiOLl5PW8Af4';   //username: admin, password: P@ssw0rd
let roleid: number;

describe("Store Front roles Endpoints", () => {

    it('createroles endpoint should create roles', async () => {
        const newrole: role = {
            "rolename": "Users",
        }
        const response = await request.post('/api/role')
            .set('Authorization', 'bearer ' + preservedtoken)
            .send(newrole)
        newrole.id = response.body.Data.id
        roleid = newrole.id as number;
        expect(response.body.Data).toEqual(newrole);
    });
    it('updateroles endpoint should update roles', async () => {
        const updaedrole: role = {
            "id": roleid,
            "rolename": "Clients"
        }
        const response = await request.put('/api/role')
            .set('Authorization', 'bearer ' + preservedtoken)
            .send(updaedrole)
        expect(response.body.Data).toEqual(updaedrole);
    });
    it('getAll endpoint should get All roles', async () => {
        const existingrole: role = {
            "id": roleid,
            "rolename": "Clients"
        }
        const response = await request.get('/api/role')
            .set('Authorization', 'bearer ' + preservedtoken)
            const roles = response.body.Data as role[]
            const role = roles.filter(r => r.id == existingrole.id)
        expect(role).toEqual([existingrole]);
    });
    it('getById endpoint should get role by id', async () => {
        const existingrole: role = {
            "id": roleid,
            "rolename": "Clients"
        }
        const response = await request.get('/api/role/'+roleid)
        .set('Authorization', 'bearer ' + preservedtoken)
        expect(response.body.Data).toEqual(existingrole);
    });
    it('deleteroles endpoint should delete roles', async () => {
        const existingrole: role = {
            "id": roleid,
            "rolename": "Clients"
        }
        const response = await request.delete('/api/role/'+roleid)
        .set('Authorization', 'bearer ' + preservedtoken)
        expect(response.body.Data).toEqual(existingrole);
    });
});


