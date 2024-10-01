type ProductCartManagerProps = {
  productId:number
  cartId:number
} 

export type IProductCartControllerProtocol = {
  add(data:ProductCartManagerProps):Promise<void>
  delete()

}