import supertest from "supertest";
import app from "../../app";
import { category } from "../../Models/category.model";

const request = supertest(app);
const preservedtoken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjEsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE2NjA1OTc2Mjh9.njgUY44d4ZvcEK-beMxjfUBzK_FO-8MyiOLl5PW8Af4';   //username: admin, password: P@ssw0rd
let _category: category = {
    "categoryname": "Electronics",
}

describe("Store Front Categories Endpoints", () => {

    it('createCategory endpoint should create categories', async () => {

        const response = await request.post('/api/category')
            .set('Authorization', 'bearer ' + preservedtoken)
            .send(_category)
        _category.id = response.body.Data.id
        expect(response.body.Data).toEqual(_category);
    });
    it('updateCategory endpoint should update categories', async () => {
        const response = await request.put('/api/category')
            .set('Authorization', 'bearer ' + preservedtoken)
            .send(_category)
        expect(response.body.Data).toEqual(_category);
    });
    it('getAll endpoint should get All categories', async () => {
        const response = await request.get('/api/category')
            .set('Authorization', 'bearer ' + preservedtoken)
        expect(response.body.Data).toEqual([_category]);
    });
    it('getById endpoint should get category by id', async () => {
        const response = await request.get('/api/category/' + _category.id)
            .set('Authorization', 'bearer ' + preservedtoken)
        expect(response.body.Data).toEqual(_category);
    });
    it('deleteCategory endpoint should delete categories', async () => {
        const response = await request.delete('/api/category/' + _category.id)
            .set('Authorization', 'bearer ' + preservedtoken)
        expect(response.body.Data).toEqual(_category);
    });
});


