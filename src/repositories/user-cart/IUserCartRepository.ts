import { IUserCartAttributes as IUserCartAttributes } from "@interfaces/cart/ICartAttributes"

export type IUserCartRepositoryProtocol = {
  create(userId:string):Promise<IUserCartAttributes>
  close(cartId:number):Promise<void>
  // readAll():Promise<void>
  // clear():Promise<void>
  // deleteOne():Promise<void>
  // updateProductQty():Promise<void>  
  getAllUserCarts(user_id:string)
  getActiveCartByUserId(userId:string):Promise<IUserCartAttributes >
}