export type ProductCartAttributes = { id: number; cart_id: number; product_id: number; quanty: number; price:number }

export type AddProductInCartResponseBody = {
  message:string
}


export type DeleteProductToProductCart = {
  user_id:string,
  cart_id:number,
  product_id:number
}


export type DeleteProductToCartResponse = {
product :ProductCartAttributes
}