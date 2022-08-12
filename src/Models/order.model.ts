
interface order_products  {
    productId: number,
    qty: number
}
export interface order {
    Id?: number,
    orderStatus?: string,
    userId: number,
    products: order_products[]
}