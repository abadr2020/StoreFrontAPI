import { productRepo } from "../Repositories/product.repo";

const product = new productRepo();

describe("Store Front Products", () => {

    it('should have an index method', () => {
        expect(product.getAll).toBeDefined();
    });
    // it('', () => {
    //     expect(productStore.show()).toBeDefined();
    // });
    // it('', () => {
    //     expect(productStore.create()).toBeDefined();
    // });
    // it('', () => {
    //     expect(productStore.delete()).toBeDefined();
    // });
    it('index method should return list of products', async() => {
        const result = await product.getAll();
        expect(result).toEqual([]);
    });
});


