import { order, orderList } from "../../Models/order.model";
import { categoryRepo } from "../../Repositories/category.repo";
import { orderRepo } from "../../Repositories/order.repo";
import { productRepo } from "../../Repositories/product.repo";
import { roleRepo } from "../../Repositories/role.repo";
import { userRepo } from "../../Repositories/user.repo";

const _productRepo = new productRepo();
const _categoryRepo = new categoryRepo();
const _orderRepo = new orderRepo();
const _roleRepo = new roleRepo();
const _userRepo = new userRepo();

let categoryid: number;
let productid: number;
let roleid: number;
let userid: number;
let orderid: number;


describe("Store Front Orders", () => {

    beforeAll(async () => {
        const category = await _categoryRepo.createCategory(
            {
                "categoryname": "Electoronics"
            }
        );
        categoryid = category?.id as number;
        const product = await _productRepo.createProduct(
            {
                "productname": "Mouse",
                "price": "100",
                categoryid
            }
        );
        const role = await _roleRepo.createRole(
            {
                "rolename": "Admin"
            }
        );
        roleid = role?.id as number;
        const user = await _userRepo.createUser(
            {
                "firstname": "Ahmed",
                "lastname": "Badr",
                "username": "abadr",
                "password": "P@ssw0rd123",
                roleid
            }
        );
        productid = product?.id as number;
        userid = user?.id as number;
    })

    it('should have an getAll method', () => {
        expect(_orderRepo.getAll).toBeDefined();
    });
    it('should have an getById method', () => {
        expect(_orderRepo.getById).toBeDefined();
    });
    it('should have an getAllByUserId method', () => {
        expect(_orderRepo.getAllByUserId).toBeDefined();
    });
    it('should have an createOrder method', () => {
        expect(_orderRepo.createOrder).toBeDefined();
    });
    it('should have an updateOrder method', () => {
        expect(_orderRepo.updateOrder).toBeDefined();
    });
    it('should have an deleteOrder method', () => {
        expect(_orderRepo.deleteOrder).toBeDefined();
    });

    it('createOrder method should create orders', async () => {
        const neworder: order = {
            userid,
            "products": [{
                productid,
                "qty": 1
            }]

        }
        const result = await _orderRepo.createOrder(neworder);
        neworder.id = result?.id;
        neworder.orderstatus = "Active";
        orderid = neworder.id as number;
        expect(result).toEqual(neworder);
    });
    it('updateorder method should update orders', async () => {
        const updateOrder: order = {
            "id": orderid,
            userid,
            "orderstatus": "Completed",
            "products": [{
                productid,
                "qty": 3
            }]

        }
        const result = await _orderRepo.updateOrder(updateOrder);
        expect(result).toEqual(updateOrder);
    });
    it('getAll method should get All orders', async () => {
        const existingorder: orderList = {
            "id": orderid,
            userid,
            "orderstatus": "Completed",
            "products": [{
                productid,
                "price": "100",
                "qty": 3
            }]
        }
        const result = await _orderRepo.getAll();
        expect(result).toEqual([existingorder]);
    });
    it('getById method should get order by id', async () => {
        const existingorder: orderList = {
            "id": orderid,
            userid,
            "orderstatus": "Completed",
            "products": [{
                productid,
                "price": "100",
                "qty": 3
            }]
        }
        const result = await _orderRepo.getById(orderid);
        expect(result).toEqual(existingorder);
    });
    it('getAllByUserId method should get All orders by user id', async () => {
        const existingorder: orderList = {
            "id": orderid,
            userid,
            "orderstatus": "Completed",
            "products": [{
                productid,
                "price": "100",
                "qty": 3
            }]
        }
        const result = await _orderRepo.getAllByUserId(userid);
        expect(result).toEqual([existingorder]);
    });
    it('deleteorder method should delete orders', async () => {

        const result = await _orderRepo.deleteOrder(orderid);
        expect(result).toEqual(1);
    });
    afterAll(async () => {
        await _productRepo.deleteProduct(productid);
        await _categoryRepo.deleteCategory(categoryid);
        await _userRepo.deleteUser(userid);
        await _roleRepo.deleteRole(roleid);
    })
});


