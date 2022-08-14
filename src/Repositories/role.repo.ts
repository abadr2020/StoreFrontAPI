import client from "../database";
import { role } from "../Models/role.model";


export class roleRepo{
    
    async getAll(): Promise<role[] | null>{
        try{
            const conn = await client.connect();
            const sql = 'select * from roles';
            const result = await conn.query(sql);
            conn.release();
            if (!result.rowCount)
            return null;
            return result.rows;
        }catch(err){
            throw new Error(`Something went wrong with error: ${err}`);
        }
    }
    async getById(id: number): Promise<role | null>{
        try{
            const conn = await client.connect();
            const sql = 'select * from roles where id=$1';
            const result = await conn.query(sql,[id]);
            conn.release();
            if (!result.rowCount)
                return null;
            return result.rows[0];
        }catch(err){
            throw new Error(`Something went wrong with error: ${err}`);
        }
    }

    async createRole(r: role): Promise<role | null> { 
        try{
            const conn = await client.connect();
            const sql = 'INSERT INTO roles (RoleName) VALUES($1) RETURNING *' 
            const result = await conn.query(sql, [r.rolename]);
            conn.release();
            const role = result.rows[0];
            return role;
        }catch(err){
            throw new Error(`Something went wrong with error: ${err}`);
        }
    }
    async updateRole(r: role): Promise<role | null> { 
        try{
            const conn = await client.connect();
            const sql = 'UPDATE roles set RoleName = $1 where Id = $2 RETURNING *';
            const result = await conn.query(sql, [r.rolename,r.id]);
            conn.release();
            const role = result.rows[0];
            return role;
        }catch(err){
            throw new Error(`Something went wrong with error: ${err}`);
        }
       
    }
    async deleteRole(id: number): Promise<role | null> { 
        try{
            const conn = await client.connect();
            const sql = 'DELETE FROM roles WHERE id=($1) RETURNING *';
            const result = await conn.query(sql, [id]);
            conn.release();
            if (!result.rowCount)
            return null;
            const role = result.rows[0];
            return role;
        }catch(err){
            throw new Error(`Something went wrong with error: ${err}`);
        }
       
    }
}