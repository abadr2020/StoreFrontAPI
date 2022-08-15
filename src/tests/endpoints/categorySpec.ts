import supertest from "supertest";
import app from "../../app";
import { category } from "../../Models/category.model";

const request = supertest(app);

describe("Store Front Categories Endpoints", () => {

    it('createCategory endpoint should create categories', async () => {
        const newcategory: category = {
            "categoryname": "Electronics",
        }
        const response = await request.post('/api/category').send(newcategory);
        newcategory.id = result?.id;
        categoryid = newcategory.id as number;
        expect(result).toEqual(newcategory);
    });

    // test(`post http method for load route`, async () => {
    //     const query = {
    //      measures: ['Foo.bar'],
    //      order: [
    //       ['Foo.bar', 'asc'],
    //       ['Foo.foo', 'desc'],
    //      ],
    //     };
    //     const res = await request(app)
    //      .post(`/cubejs-api/v1/load`)
    //      .set('Content-type', 'application/json')
    //      .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.t-IDcSemACt8x4iTMCda8Yhe3iZaWbvV5XKSTbuAn0M')
    //      .send({ query })
    //      .expect(200);

    //     expect(res.body.query.order).toStrictEqual([
    //      { id: 'Foo.bar', desc: false },
    //      { id: 'Foo.foo', desc: true },
    //     ]);
    //     expect(res.body.query.measures).toStrictEqual(['Foo.bar']);
    //    });
    it('updateCategory endpoint should update categories', async () => {
        const updaedcategory: category = {
            "id": categoryid,
            "categoryname": "Computers"
        }
        const result = await _categoryRepo.updateCategory(updaedcategory);
        expect(result).toEqual(updaedcategory);
    });
    it('getAll endpoint should get All categories', async () => {
        const existingcategory: category = {
            "id": categoryid,
            "categoryname": "Computers"
        }
        const result = await _categoryRepo.getAll();
        expect(result).toEqual([existingcategory]);
    });
    it('getById endpoint should get category by id', async () => {
        const existingcategory: category = {
            "id": categoryid,
            "categoryname": "Computers"
        }
        const result = await _categoryRepo.getById(categoryid);
        expect(result).toEqual(existingcategory);
    });
    it('deleteCategory endpoint should delete categories', async () => {
        const existingcategory: category = {
            "id": categoryid,
            "categoryname": "Computers"
        }
        const result = await _categoryRepo.deleteCategory(categoryid);
        expect(result).toEqual(existingcategory);
    });
});


