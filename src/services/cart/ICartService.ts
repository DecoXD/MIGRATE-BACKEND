import { IUserCartAttributes } from "@interfaces/cart/ICartAttributes"

export type ICartServiceProtocol = {
  checkIfUserHasAnActiveCart(userId:string):Promise<boolean>
  create(userId:string):Promise<IUserCartAttributes>
  getAllUserCarts(userId:string):Promise<IUserCartAttributes[]>
}