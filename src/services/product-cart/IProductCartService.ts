import { AddProductResponseBody } from "@interfaces/product"
import { AddProductInCartResponseBody, ProductCartAttributes } from "@interfaces/product-cart"

export type IProductCartServiceProtocol = {
  add({product_id,cart_id}):Promise<AddProductInCartResponseBody>
  delete({product_id,cart_id}):Promise<void>
  getAll(cart_id:number):Promise<ProductCartAttributes[]>
}