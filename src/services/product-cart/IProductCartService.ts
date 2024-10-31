import { AddProductResponseBody } from "@interfaces/product"
import { AddProductInCartResponseBody, DeleteProductToCartResponse, DeleteProductToProductCart, ProductCartAttributes } from "@interfaces/product-cart"

export type IProductCartServiceProtocol = {
  add({product_id,cart_id}):Promise<AddProductInCartResponseBody>
  delete({user_id,product_id,cart_id}:DeleteProductToProductCart):Promise<DeleteProductToCartResponse>
  getAll(cart_id:number):Promise<ProductCartAttributes[]>
}