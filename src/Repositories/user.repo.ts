import client from "../database";
import { user } from "../Models/user.model";


export class userRepo {

    async getAll(): Promise<user[] | null> {
        try {
            const conn = await client.connect();
            const sql = 'select * from users';
            const result = await conn.query(sql);
            conn.release();
            if (!result.rowCount)
                return null;
            return result.rows;
        } catch (err) {
            throw new Error(`Something went wrong with error: ${err}`);
        }
    }
    async getById(id: number): Promise<user | null> {
        try {
            const conn = await client.connect();
            const sql = 'select * from users where id=$1';
            const result = await conn.query(sql, [id]);
            conn.release();
            if (!result.rowCount)
                return null;
            return result.rows[0];
        } catch (err) {
            throw new Error(`Something went wrong with error: ${err}`);
        }
    }
    async getByUsername(username: string): Promise<user | null> {
        try {
            const conn = await client.connect();
            const sql = 'select * from users where username=$1';
            const result = await conn.query(sql, [username]);
            conn.release();
            if (!result.rowCount)
                return null;
            return result.rows[0];
        } catch (err) {
            throw new Error(`Something went wrong with error: ${err}`);
        }
    }
    async getByRoleId(roleId: number): Promise<user[] | null> {
        try {
            const conn = await client.connect();
            const sql = 'select * from users where roleId=$1';
            const result = await conn.query(sql, [roleId]);
            conn.release();
            if (!result.rowCount)
                return null;
            return result.rows;
        } catch (err) {
            throw new Error(`Something went wrong with error: ${err}`);
        }
    }

    async createUser(u: user): Promise<user | null> {
        try {
            const conn = await client.connect();
            const sql = 'INSERT INTO users (FirstName, LastName, UserName,Password, RoleId) VALUES($1, $2, $3, $4, $5) RETURNING *'
            const result = await conn.query(sql, [u.firstname, u.lastname, u.username, u.password, u.roleid]);
            conn.release();
            const user = result.rows[0];
            return user;
        } catch (err) {
            throw new Error(`Something went wrong with error: ${err}`);
        }
    }
    async updateUser(u: user): Promise<user | null> {
        try {
            const conn = await client.connect();
            const sql = 'UPDATE users set FirstName = $1 , LastName = $2 , UserName = $3 , Password = $4 , RoleId = $5 where id = $6 RETURNING *'
            const result = await conn.query(sql, [u.firstname, u.lastname, u.username, u.password, u.roleid, u.id]);
            conn.release();
            const user = result.rows[0];
            return user;
        } catch (err) {
            throw new Error(`Something went wrong with error: ${err}`);
        }
    }
    async deleteUser(id: number): Promise<user | null> {
        try {
            const conn = await client.connect();
            const sql = 'DELETE FROM users WHERE id=($1) RETURNING *';
            const result = await conn.query(sql, [id]);
            conn.release();
            if (!result.rowCount)
                return null;
            const user = result.rows[0];
            return user;
        } catch (err) {
            throw new Error(`Something went wrong with error: ${err}`);
        }

    }
}