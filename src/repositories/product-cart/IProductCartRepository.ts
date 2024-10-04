import { ProductCartAttributes } from "@interfaces/product-cart"

export type IProductCartRepositoryProtocol = {
  create(cart_id:number,product_id:number):Promise<void>
  remove(productId:number):Promise<void>
  updateQuanty(productId:number):Promise<void>
  readAll(cart_id:number):Promise<ProductCartAttributes[]>
}