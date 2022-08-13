import client from "../database";
import { category } from "../Models/category.model";

export class categoryRepo{
    
    async getAll(): Promise<category[] | null>{
        try{
            const conn = await client.connect();
            const sql = 'select * from categories';
            const result = await conn.query(sql);
            conn.release();
            if (!result.rowCount)
                return null;
            return result.rows;
        }catch(err){
            throw new Error(`Something went wrong with error: ${err}`);
        }
    }
    async getById(id: number): Promise<category | null>{
        try{
            const conn = await client.connect();
            const sql = 'select * from Categories where id=$1';
            const result = await conn.query(sql,[id]);
            conn.release();
            if (!result.rowCount)
                return null;
            return result.rows[0];
        }catch(err){
            throw new Error(`Something went wrong with error: ${err}`);
        }
    }

    async createCategory(c: category): Promise<category | null> { 
        try{
            const conn = await client.connect();
            const sql = 'INSERT INTO Categories (CategoryName) VALUES($1) RETURNING *' 
            const result = await conn .query(sql, [c.categoryname]);
            conn.release();
            const category = result.rows[0];
            return category;
        }catch(err){
            throw new Error(`Something went wrong with error: ${err}`);
        }
    }
    async updateCategory(c: category): Promise<category | null> { 
        try{
            const conn = await client.connect();
            const sql = 'UPDATE Categories set CategoryName = $1 where id = $2  RETURNING *' 
            const result = await conn .query(sql, [c.categoryname, c.id]);
            conn.release();
            const category = result.rows[0];
            return category;
        }catch(err){
            throw new Error(`Something went wrong with error: ${err}`);
        }
    }

    async deleteCategory(id: number): Promise<category | null> { 
        try{
            const conn = await client.connect();
            const sql = 'DELETE FROM Categories WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            conn.release();
            const role = result.rows[0];
            return role;
        }catch(err){
            throw new Error(`Something went wrong with error: ${err}`);
        }
       
    }
}