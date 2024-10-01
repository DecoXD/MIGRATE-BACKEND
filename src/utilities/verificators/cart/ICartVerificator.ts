import { IUserCartAttributes } from "@interfaces/cart/ICartAttributes"

export type ICartVerificatorProtocol = {
  checkIfUserHasAnActiveCart(userId:string):Promise<boolean>
}