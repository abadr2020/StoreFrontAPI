import supertest from "supertest";
import app from "../../app";
import { product } from "../../Models/product.model";

const request = supertest(app);
const preservedtoken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjEsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE2NjA1OTc2Mjh9.njgUY44d4ZvcEK-beMxjfUBzK_FO-8MyiOLl5PW8Af4';   //username: admin, password: P@ssw0rd
let categoryid: number;
let _product: product;

describe("Store Front products Endpoints", () => {
    beforeAll(async () => {
        const category = await request.post("/api/category")
            .set('Authorization', 'bearer ' + preservedtoken)
            .send({ "categoryname": "Electoronics" })

        categoryid = category?.body.Data.id as number;
    })
    it('createproducts endpoint should create products', async () => {
        _product = {
            "productname": "Mouse",
            "price": "100",
            categoryid
        }
        const response = await request.post('/api/product')
            .set('Authorization', 'bearer ' + preservedtoken)
            .send(_product)
        _product.id = response.body.Data.id
        expect(response.body.Data).toEqual(_product);
    });
    it('updateproducts endpoint should update products', async () => {
        const response = await request.put('/api/product')
            .set('Authorization', 'bearer ' + preservedtoken)
            .send(_product)
        expect(response.body.Data).toEqual(_product);
    });
    it('getAll endpoint should get All products', async () => {
        const response = await request.get('/api/product')
            .set('Authorization', 'bearer ' + preservedtoken)
        const products = response.body.Data as product[]
        const product = products.filter(r => r.id == _product.id)
        expect(product).toEqual([_product]);
    });
    it('getById endpoint should get product by id', async () => {
        const response = await request.get('/api/product/' + _product.id)
            .set('Authorization', 'bearer ' + preservedtoken)
        expect(response.body.Data).toEqual(_product);
    });
    it('deleteproducts endpoint should delete products', async () => {
        const response = await request.delete('/api/product/' + _product.id)
            .set('Authorization', 'bearer ' + preservedtoken)
        expect(response.body.Data).toEqual(_product);
    });
    afterAll(async () => {
        await request.delete('/api/category/' + categoryid)
            .set('Authorization', 'bearer ' + preservedtoken)
    })
});


