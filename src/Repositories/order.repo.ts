import client from "../database";
import { order, order_products_List } from "../Models/order.model";


export class orderRepo {

    async getAll(): Promise<order[] | null> {
        try {
            const conn = await client.connect();
            const sql = `select orders_products.orderid,orders_products.productid,orders_products.qty,products.price, orders.userid,orders.orderstatus 
                        from orders_products 
                        inner join products on orders_products.productid = products.id
                        inner join orders on orders_products.orderid = orders.id;`;
            const result = await conn.query(sql);
            conn.release();
            if (!result.rowCount)
                return null;
            const orderResults = result.rows;
            const ordersIds = [...new Set(orderResults.map(item => item.orderid))];
            const orders: order[] = [];
            ordersIds.forEach(id => {
                const filteredOrders = orderResults.filter(o => o.orderid == id)
                const order: order = {
                    id: id,
                    userid: filteredOrders[0].userid,
                    orderstatus: filteredOrders[0].orderstatus,
                    products: []
                };
                filteredOrders.forEach(fo => {
                    const product: order_products_List = {
                        productid: fo.productid,
                        price: fo.price,
                        qty: fo.qty
                    }
                    order.products.push(product)
                });
                orders.push(order)
            });
            return orders;
        } catch (err) {
            console.log(err);
            return null;
        }
    }
    async getAllByUserId(userid: number): Promise<order[] | null> {
        try {
            const conn = await client.connect();
            const sql = `select orders_products.orderid,orders_products.productid,orders_products.qty,products.price, orders.userid,orders.orderstatus 
                        from orders_products 
                        inner join products on orders_products.productid = products.id
                        inner join orders on orders_products.orderid = orders.id
                        where orders.userid = $1;`;
            const result = await conn.query(sql, [userid]);
            conn.release();
            if (!result.rowCount)
                return null;
            const orderResults = result.rows;
            const ordersIds = [...new Set(orderResults.map(item => item.orderid))];
            const orders: order[] = [];
            ordersIds.forEach(id => {
                const filteredOrders = orderResults.filter(o => o.orderid == id)
                const order: order = {
                    id: id,
                    userid: filteredOrders[0].userid,
                    orderstatus: filteredOrders[0].orderstatus,
                    products: []
                };
                filteredOrders.forEach(fo => {
                    const product: order_products_List = {
                        productid: fo.productid,
                        price: fo.price,
                        qty: fo.qty
                    }
                    order.products.push(product)
                });
                orders.push(order)
            });
            return orders;
        } catch (err) {
            console.log(err);
            return null;
        }
    }
    async getById(id: number): Promise<order | null> {
        try {
            const conn = await client.connect();
            const sql = `select orders_products.orderid,orders_products.productid,orders_products.qty,products.price, orders.userid,orders.orderstatus 
                        from orders_products 
                        inner join products on orders_products.productid = products.id
                        inner join orders on orders_products.orderid = orders.id
                        where orders_products.orderid=$1;`;
            const result = await conn.query(sql, [id]);
            conn.release();
            if (!result.rowCount)
                return null;
            const orderResults = result.rows;
            const order: order = {
                id: id,
                userid: orderResults[0].userid,
                orderstatus: orderResults[0].orderstatus,
                products: []
            };
            orderResults.forEach(fo => {
                const product: order_products_List = {
                    productid: fo.productid,
                    price: fo.price,
                    qty: fo.qty
                }
                order.products.push(product)
            });
            return order;
        } catch (err) {
            console.log(err);
            return null;
        }
    }

    async createOrder(ord: order): Promise<order | null> {
        try {
            const conn = await client.connect();
            let sql = 'INSERT INTO orders (UserId) VALUES($1) RETURNING *'
            const orderResult = await conn.query(sql, [ord.userid]);
            if (orderResult.rowCount > 0) {
                const order: order = {
                    id: orderResult.rows[0]['id'],
                    userid: ord.userid,
                    orderstatus: orderResult.rows[0]['orderstatus'],
                    products: []
                };
                for (const product of ord.products) {
                    sql = 'INSERT INTO Orders_Products (OrderId, ProductId, Qty) VALUES($1, $2, $3)  RETURNING productid, qty'
                    const result = await conn.query(sql, [orderResult.rows[0].id, product.productid, product.qty]);
                    order.products.push(result.rows[0]);
                }
                conn.release();
                return order;
            } else {
                return null;
            }
        } catch (err) {
            console.log(err);
            return null;
        }
    }
    async updateOrder(ord: order): Promise<order | null> {
        try {
            const conn = await client.connect();
            let sql = 'DELETE From Orders_Products where orderid = $1 RETURNING *'
            const orderResult = await conn.query(sql, [ord.id]);
            if (orderResult.rowCount > 0) {
                sql = 'Update orders set orderstatus=$1, userid=$2 where id = $3 RETURNING *'
                const orderupdateResult = await conn.query(sql, [ord.orderstatus, ord.userid, ord.id]);
                if (orderupdateResult.rowCount > 0) {
                    const order: order = {
                        id: ord.id,
                        userid: ord.userid,
                        orderstatus: ord.orderstatus,
                        products: []
                    };
                    for (const product of ord.products) {
                        sql = 'INSERT INTO Orders_Products (OrderId, ProductId, Qty) VALUES($1, $2, $3)  RETURNING productid, qty'
                        const result = await conn.query(sql, [ord.id, product.productid, product.qty]);
                        order.products.push(result.rows[0]);
                    }
                    conn.release();
                    return order;
                } else {
                    return null;
                }
            } else {
                return null;
            }
        } catch (err) {
            console.log(err);
            return null;
        }
    }

    async deleteOrder(id: number): Promise<number | null> {
        try {
            const conn = await client.connect();
            const sql = 'DELETE FROM orders WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            if (!result.rowCount)
                return null;
            conn.release();
            if (!result.rowCount)
                return null;
            return result.rowCount;
            // const conn = await client.connect();
            // let sql = 'DELETE FROM orders_products WHERE orderid=($1)';
            // let result = await conn.query(sql, [id]);
            // if (!result.rowCount)
            //     return null;
            // sql = 'DELETE FROM orders WHERE id=($1)';
            // result = await conn.query(sql, [id]);
            // conn.release();
            // if (!result.rowCount)
            //     return null;
            // return result.rowCount;
        } catch (err) {
            throw new Error(`Something went wrong with error: ${err}`);
        }

    }
}