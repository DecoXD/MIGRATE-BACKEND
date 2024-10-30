import { CreateUserCartProps, IUserCartAttributes,  } from "../../interfaces/cart/ICartAttributes"

export type IUserCartControllerProtocol = {
  createCart(cardProps:CreateUserCartProps):Promise<IUserCartAttributes>
  getAllUserCart(userId:string)
  // closeCart(cartId:number):Promise<void>
  // removeProduct():Promise<void>
  // updateProductQty():Promise<void>
  // clearCart():Promise<void>
  // readCart():Promise<void>


}