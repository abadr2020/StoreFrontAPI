
interface order_products {
    productid: number,
    qty: number
}
export interface order_products_List {
    productid: number,
    price?: string,
    qty: number
}
export interface order {
    id?: number,
    orderstatus?: string,
    userid: number,
    products: order_products[]
}

export interface orderList {
    id?: number,
    orderstatus?: string,
    userid: number,
    products: order_products_List[]
}