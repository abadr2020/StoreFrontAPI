import supertest from "supertest";
import app from "../../app";
import { category } from "../../Models/category.model";

const request = supertest(app);
let token: string;
let catid: number;

describe("Store Front Categories Endpoints", () => {
    beforeAll(async () => {
        const roleResponse = await request.post('/api/role')
            .set('Content-type', 'application/json')
            .send({ rolename: 'Admin' });
        const roleid = roleResponse.body.Data.id;
        const userResponse = await request.post('/api/user/register')
            .set('Content-type', 'application/json')
            .send({
                "firstname": "Ahmed",
                "lastname": "Badr",
                "username": "abadr",
                "password": "P@ssw0rd123",
                roleid
            });
        token = userResponse.body.Data;
    })

    it('createCategory endpoint should create categories', async () => {
        const newcategory: category = {
            "categoryname": "Electronics",
        }
        const response = await request.post('/api/category')
            .set('Authorization', 'bearer ' + token)
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
            .set('Authorization', 'bearer ' + token)
            .send(updaedcategory)
        expect(response.body.Data).toEqual(updaedcategory);
    });
    // it('getAll endpoint should get All categories', async () => {
    //     const existingcategory: category = {
    //         "id": categoryid,
    //         "categoryname": "Computers"
    //     }
    //     const result = await _categoryRepo.getAll();
    //     expect(result).toEqual([existingcategory]);
    // });
    // it('getById endpoint should get category by id', async () => {
    //     const existingcategory: category = {
    //         "id": categoryid,
    //         "categoryname": "Computers"
    //     }
    //     const result = await _categoryRepo.getById(categoryid);
    //     expect(result).toEqual(existingcategory);
    // });
    // it('deleteCategory endpoint should delete categories', async () => {
    //     const existingcategory: category = {
    //         "id": categoryid,
    //         "categoryname": "Computers"
    //     }
    //     const result = await _categoryRepo.deleteCategory(categoryid);
    //     expect(result).toEqual(existingcategory);
    // });
});


