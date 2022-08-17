import supertest from "supertest";
import app from "../../app";
import { order, orderList } from "../../Models/order.model";
import { product } from "../../Models/product.model";

const request = supertest(app);
const preservedtoken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjEsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE2NjA1OTc2Mjh9.njgUY44d4ZvcEK-beMxjfUBzK_FO-8MyiOLl5PW8Af4';   //username: admin, password: P@ssw0rd
const userid = 1; //seeded User => username: admin, password: P@ssw0rd
let categoryid: number;
let _product: product;
let _order: order = {
    userid,
    products: []
};

describe("Store Front orders Endpoints", () => {
    beforeAll(async () => {
        const category = await request.post("/api/category")
            .set('Authorization', 'bearer ' + preservedtoken)
            .send({ "categoryname": "Electoronics" })

        categoryid = category?.body.Data.id as number;
        _product = {
            "productname": "Mouse",
            "price": "100",
            categoryid
        }

        const addedproduct = await request.post("/api/product")
            .set('Authorization', 'bearer ' + preservedtoken)
            .send(_product)

        _product.id = addedproduct?.body.Data.id as number;
    })
    it('createorders endpoint should create orders', async () => {
        _order.products.push({
            productid: _product.id as number,
            qty: 5
        });
        const response = await request.post('/api/order')
            .set('Authorization', 'bearer ' + preservedtoken)
            .send(_order)
        _order.id = response.body.Data.id;
        _order.orderstatus = response.body.Data.orderstatus;
        expect(response.body.Data).toEqual(_order);
    });
    it('updateorders endpoint should update orders', async () => {
        const response = await request.put('/api/order')
            .set('Authorization', 'bearer ' + preservedtoken)
            .send(_order)
        expect(response.body.Data).toEqual(_order);
    });
    it('getAll endpoint should get All orders', async () => {
        const response = await request.get('/api/order')
            .set('Authorization', 'bearer ' + preservedtoken)
        const orders = response.body.Data as orderList[]
        const order = orders.filter(r => r.id == _order.id)
        delete order[0].products[0].price;
        expect(order).toEqual([_order]);
    });
    it('getAllByUserId endpoint should get All orders', async () => {
        const response = await request.get('/api/order/getallbyuser/' + userid)
            .set('Authorization', 'bearer ' + preservedtoken)
        const orders = response.body.Data as orderList[]
        const order = orders.filter(r => r.id == _order.id)
        delete order[0].products[0].price;
        expect(order).toEqual([_order]);
    });
    it('getById endpoint should get order by id', async () => {
        const response = await request.get('/api/order/' + _order.id)
            .set('Authorization', 'bearer ' + preservedtoken)
        delete response.body.Data.products[0].price;
        expect(response.body.Data).toEqual(_order);
    });
    it('deleteorders endpoint should delete orders', async () => {
        const response = await request.delete('/api/order/' + _order.id)
            .set('Authorization', 'bearer ' + preservedtoken)
        expect(response.body.Data).toEqual(1);
    });
    afterAll(async () => {
        await request.delete('/api/product/' + _product.id)
            .set('Authorization', 'bearer ' + preservedtoken)
        await request.delete('/api/category/' + categoryid)
            .set('Authorization', 'bearer ' + preservedtoken)
    })
});


