import { category } from "../../Models/category.model";
import { categoryRepo } from "../../Repositories/category.repo";

const _categoryRepo= new categoryRepo();
let categoryid: number;

describe("Store Front Categories", () => {

    it('should have an getAll method', () => {
        expect(_categoryRepo.getAll).toBeDefined();
    });
    it('should have an getById method', () => {
        expect(_categoryRepo.getById).toBeDefined();
    });
    it('should have an createCategory method', () => {
        expect(_categoryRepo.createCategory).toBeDefined();
    });
    it('should have an updateCategory method', () => {
        expect(_categoryRepo.updateCategory).toBeDefined();
    });
    it('should have an deleteCategory method', () => {
        expect(_categoryRepo.deleteCategory).toBeDefined();
    });

    it('createCategory method should create categories', async () => {
        const newcategory: category = {
            "categoryname" : "Electronics",
        }
        const result = await _categoryRepo.createCategory(newcategory);
        newcategory.id = result?.id;
        categoryid = newcategory.id as number;
        expect(result).toEqual(newcategory);
    });
    it('updateCategory method should update categories', async () => {
        const updaedcategory: category = {
            "id":categoryid,
            "categoryname" : "Computers"
        }
        const result = await _categoryRepo.updateCategory(updaedcategory);
        expect(result).toEqual(updaedcategory);
    });
    it('getAll method should get All categories', async () => {
        const existingcategory: category = {
            "id":categoryid,
            "categoryname" : "Computers"
        }
        const result = await _categoryRepo.getAll();
        expect(result).toContain(existingcategory);
    });
    it('getById method should get category by id', async () => {
        const existingcategory: category = {
            "id":categoryid,
            "categoryname" : "Computers"
        }
        const result = await _categoryRepo.getById(categoryid);
        expect(result).toEqual(existingcategory);
    });
    it('deleteCategory method should delete categories', async () => {
        const existingcategory: category = {
            "id":categoryid,
            "categoryname" : "Computers"
        }
        const result = await _categoryRepo.deleteCategory(categoryid);
        expect(result).toEqual(existingcategory);
    });
});


