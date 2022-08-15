import supertest from "supertest";
import app from "../../app";
import { category } from "../../Models/category.model";

const request = supertest(app);
const preservedtoken= 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjEsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE2NjA1OTc2Mjh9.njgUY44d4ZvcEK-beMxjfUBzK_FO-8MyiOLl5PW8Af4';   //username: admin, password: P@ssw0rd
let catid: number;

describe("Store Front Categories Endpoints", () => {

    it('createCategory endpoint should create categories', async () => {
        const newcategory: category = {
            "categoryname": "Electronics",
        }
        const response = await request.post('/api/category')
            .set('Authorization', 'bearer ' + preservedtoken)
            .send(newcategory)
        newcategory.id = response.body.Data.id
        catid = newcategory.id as number;
        expect(response.body.Data).toEqual(newcategory);
    });
    it('updateCategory endpoint should update categories', async () => {
        const updaedcategory: category = {
            "id": catid,
            "categoryname": "Computers"
        }
        const response = await request.put('/api/category')
            .set('Authorization', 'bearer ' + preservedtoken)
            .send(updaedcategory)
        expect(response.body.Data).toEqual(updaedcategory);
    });
    it('getAll endpoint should get All categories', async () => {
        const existingcategory: category = {
            "id": catid,
            "categoryname": "Computers"
        }
        const response = await request.get('/api/category')
            .set('Authorization', 'bearer ' + preservedtoken)
        expect(response.body.Data).toEqual([existingcategory]);
    });
    it('getById endpoint should get category by id', async () => {
        const existingcategory: category = {
            "id": catid,
            "categoryname": "Computers"
        }
        const response = await request.get('/api/category/'+catid)
        .set('Authorization', 'bearer ' + preservedtoken)
        expect(response.body.Data).toEqual(existingcategory);
    });
    it('deleteCategory endpoint should delete categories', async () => {
        const existingcategory: category = {
            "id": catid,
            "categoryname": "Computers"
        }
        const response = await request.delete('/api/category/'+catid)
        .set('Authorization', 'bearer ' + preservedtoken)
        expect(response.body.Data).toEqual(existingcategory);
    });
});


