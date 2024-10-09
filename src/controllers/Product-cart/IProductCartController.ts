type ProductCartManagerProps = {
  product_id:number
  cart_id:number
  price:number
} 

type BundlingProps = {
  cartId: number
  user_id: string
  total: number
}

export type IProductCartControllerProtocol = {
  add(data:ProductCartManagerProps)
  delete(productId:number):Promise<void>
  bundling(data:BundlingProps):Promise<void>
  getAll(cart_id:number)

}

//to bundling i must has the cart id and all products id linked to this cart.