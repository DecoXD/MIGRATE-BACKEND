import { DeleteProductToCartResponse, ProductCartAttributes } from "@interfaces/product-cart"

export type IProductCartRepositoryProtocol = {
  create(cart_id:number,product_id:number,price:number):Promise<void>
  remove(productId:number,cart_id:number):Promise<DeleteProductToCartResponse>
  updateQuanty(productId:number):Promise<void>
  readAll(cart_id:number):Promise<ProductCartAttributes[]>
  getByCartId(cart_id:number):Promise<ProductCartAttributes[]>
}