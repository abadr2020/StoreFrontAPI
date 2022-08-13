import client from "../database";
import { product } from "../Models/product.model";

export class productRepo{
    
    async getAll(): Promise<product[] | null>{
        try{
            const conn = await client.connect();
            const sql = 'select * from products';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }catch(err){
            throw new Error(`Something went wrong with error: ${err}`);
        }
    }
    async getById(id: number): Promise<product | null>{
        try{
            const conn = await client.connect();
            const sql = 'select * from products where id=$1';
            const result = await conn.query(sql,[id]);
            conn.release();
            if (!result.rowCount)
                return null;
            return result.rows[0];
        }catch(err){
            throw new Error(`Something went wrong with error: ${err}`);
        }
    }
    async getByCatId(catId: string): Promise<product[] | null>{
        try{
            const conn = await client.connect();
            const sql = 'select * from products where categoryId=$1';
            const result = await conn.query(sql,[catId]);
            conn.release();
            if (!result.rowCount)
                return null;
            return result.rows;
        }catch(err){
            throw new Error(`Something went wrong with error: ${err}`);
        }
    }

    async createProduct(p: product): Promise<product | null> { 
        try{
            const conn = await client.connect();
            const sql = 'INSERT INTO products (ProductName, Price, CategoryId) VALUES($1, $2, $3) RETURNING *' 
            const result = await conn .query(sql, [p.productname, p.price, p.categoryid]);
            conn.release();
            const product = result.rows[0];
            return product;
        }catch(err){
            throw new Error(`Something went wrong with error: ${err}`);
        }
    }
    async updateProduct(p: product): Promise<product | null> { 
        try{
            const conn = await client.connect();
            const sql = 'UPDATE products set ProductName = $1 and Price = $2 and CategoryId = $3 where Id = $4 RETURNING *';
            const result = await conn .query(sql, [p.productname, p.price, p.categoryid, p.id]);
            conn.release();
            const product = result.rows[0];
            return product;
        }catch(err){
            throw new Error(`Something went wrong with error: ${err}`);
        }
       
    }
    async deleteProduct(id: number): Promise<number | null> { 
        try{
            const conn = await client.connect();
            const sql = 'DELETE FROM products WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rowCount;
        }catch(err){
            throw new Error(`Something went wrong with error: ${err}`);
        }
       
    }
}