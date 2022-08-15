import { product } from "../../Models/product.model";
import { categoryRepo } from "../../Repositories/category.repo";
import { productRepo } from "../../Repositories/product.repo";

const _productRepo= new productRepo();
const _categoryRepo = new categoryRepo();
let categoryid: number;
let productid: number;


describe("Store Front Products", () => {

    beforeAll(async () => {
        const category = await _categoryRepo.createCategory(
            {
                "categoryname" : "Electoronics"
            }
        );
        categoryid = category?.id as number;
    })

    it('should have an getAll method', () => {
        expect(_productRepo.getAll).toBeDefined();
    });
    it('should have an getById method', () => {
        expect(_productRepo.getById).toBeDefined();
    });
    it('should have an getByCatId method', () => {
        expect(_productRepo.getByCatId).toBeDefined();
    });
    it('should have an createProduct method', () => {
        expect(_productRepo.createProduct).toBeDefined();
    });
    it('should have an updateProduct method', () => {
        expect(_productRepo.updateProduct).toBeDefined();
    });
    it('should have an deleteProduct method', () => {
        expect(_productRepo.deleteProduct).toBeDefined();
    });

    it('createProduct method should create products', async () => {
        const newproduct: product = {
            "productname" : "Mouse",
            "price": "100",
            categoryid
        }
        const result = await _productRepo.createProduct(newproduct);
        newproduct.id = result?.id;
        productid = newproduct.id as number;
        expect(result).toEqual(newproduct);
    });
    it('updateProduct method should update products', async () => {
        const updaedproduct: product = {
            "id":productid,
            "productname" : "Keyboard",
            "price": "150",
            categoryid
        }
        const result = await _productRepo.updateProduct(updaedproduct);
        expect(result).toEqual(updaedproduct);
    });
    it('getAll method should get All products', async () => {
        const existingproduct: product = {
            "id":productid,
            "productname" : "Keyboard",
            "price": "150",
            categoryid
        }
        const result = await _productRepo.getAll();
        expect(result).toEqual([existingproduct]);
    });
    it('getById method should get product by id', async () => {
        const existingproduct: product = {
            "id":productid,
            "productname" : "Keyboard",
            "price": "150",
            categoryid
        }
        const result = await _productRepo.getById(productid);
        expect(result).toEqual(existingproduct);
    });
    it('getByCatId method should get product by category id', async () => {
        const existingproduct: product = {
            "id":productid,
            "productname" : "Keyboard",
            "price": "150",
            categoryid
        }
        const result = await _productRepo.getByCatId(categoryid);
        expect(result).toEqual([existingproduct]);
    });
    it('deleteProduct method should delete products', async () => {
        const existingproduct: product = {
            "id":productid,
            "productname" : "Keyboard",
            "price": "150",
            categoryid
        }
        const result = await _productRepo.deleteProduct(productid);
        expect(result).toEqual(existingproduct);
    });
    afterAll(async () => {
        await _categoryRepo.deleteCategory(categoryid);
    })
});


