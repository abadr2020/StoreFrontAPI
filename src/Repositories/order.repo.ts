import client from "../database";
import { order } from "../Models/order.model";


export class orderRepo {
    
    async getAll(): Promise<order[] | null>{
        try{
            const conn = await client.connect();
            const sql = 'select * from orders inner join Orders_Products on Orders_Products.OrderId = orders.Id';
            const result = await conn.query(sql);
            conn.release();
            const orderResults = result.rows;
            // console.log(orderResults)
            const ordersIds = [...new Set(orderResults.map(item => item.id))]; 
            const orders: order[] = [];
            ordersIds.forEach(id => {
                const filteredOrders = orderResults.filter(o => o.orderid == id)
                const order: order={
                    Id: id,
                    userId: filteredOrders[0].userid,
                    orderStatus: filteredOrders[0].orderstatus,
                    products:[]
                };
                filteredOrders.forEach(fo => {
                    const product ={
                        productId : fo.productid,
                        qty: fo.qty
                    }
                    order.products.push(product)
                });
                orders.push(order)
            });
            return orders;
        }catch(err){
            console.log(err);
            return null;        }
    }
    async getById(id: number): Promise<order | null>{
        try{
            const conn = await client.connect();
            const sql = 'select * from orders inner join Orders_Products on Orders_Products.OrderId = orders.Id where orders.id=$1';
            const result = await conn.query(sql,[id]);
            conn.release();
            if (!result.rowCount)
                return null;
            return result.rows[0];
        }catch(err){
            console.log(err);
            return null;
        }
    }

    async createOrder(ord: order): Promise<order | null> { 
        try{
            const conn = await client.connect();
            let sql = 'INSERT INTO orders (UserId) VALUES($1) RETURNING *' 
            const orderResult = await conn.query(sql, [ord.userId]);
            if (orderResult.rowCount > 0 )
            {   
                const order: order={
                    Id: orderResult.rows[0]['id'],
                    userId: ord.userId,
                    orderStatus: orderResult.rows[0]['orderstatus'],
                    products:[]
                };
                for (const product of ord.products)
                {
                    sql = 'INSERT INTO Orders_Products (OrderId, ProductId, Qty) VALUES($1, $2, $3)  RETURNING productid, qty'
                    const result = await conn.query(sql,[orderResult.rows[0].id, product.productId, product.qty]);
                    order.products.push(result.rows[0]);
                }
                conn.release();
                return order;
            } else {
                return null;
            }
        }catch(err){
            console.log(err);
            return null;        
        }
    }
    async updateOrder(ord: order): Promise<order | null> { 
        try{//To Be Modified
            const conn = await client.connect();
            let sql = 'INSERT INTO orders (UserId) VALUES($1) RETURNING *' 
            const orderResult = await conn.query(sql, [ord.userId]);
            if (orderResult.rowCount > 0 )
            {   
                const order: order={
                    Id: orderResult.rows[0]['id'],
                    userId: ord.userId,
                    orderStatus: orderResult.rows[0]['orderstatus'],
                    products:[]
                };
                for (const product of ord.products)
                {
                    sql = 'INSERT INTO Orders_Products (OrderId, ProductId, Qty) VALUES($1, $2, $3)  RETURNING productid, qty'
                    const result = await conn.query(sql,[orderResult.rows[0].id, product.productId, product.qty]);
                    order.products.push(result.rows[0]);
                }
                conn.release();
                return order;
            } else {
                return null;
            }
        }catch(err){
            console.log(err);
            return null;        
        }
    }

    async deleteOrder(id: number): Promise<number | null> { 
        try{
            const conn = await client.connect();
            const sql = 'DELETE FROM orders WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            conn.release();
            if (!result.rowCount)
                return null;
            return result.rowCount;
        }catch(err){
            throw new Error(`Something went wrong with error: ${err}`);
        }
       
    }
}