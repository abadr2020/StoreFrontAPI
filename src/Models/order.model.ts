
interface order_products  {
    productid: number,
    qty: number
}
export interface order {
    id?: number,
    orderstatus?: string,
    userid: number,
    products: order_products[]
}