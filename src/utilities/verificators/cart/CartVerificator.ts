
import { ICartVerificatorProtocol as IUserCartVerificatorProtocol } from "./ICartVerificator";
import { IUserRepositoryProtocol } from "../../../repositories/auth/IUserRepository";
import { IUserCartRepositoryProtocol } from "../../../repositories/user-cart/IUserCartRepository";
import { HttpException } from "../../../exceptions/HttpException";

export class UserCartVerificator implements IUserCartVerificatorProtocol {
  constructor(private cartRepository:IUserCartRepositoryProtocol) {

  }
  async checkIfUserHasAnActiveCart(userId: string): Promise<boolean> {
   try {
    if(!userId) throw new HttpException('user not found when check if has an active cart',401)
    const userCart = await this.cartRepository.getActiveCartByUserId(userId)
    //se o usuário ja possui um carrinho ativo eu nao vou criar
    if(userCart) true // % meio redundante mas nao influencia na logica.

    //cart doesnt exists
    return false
    
   } catch (error) {
      if(error instanceof HttpException){
        throw new HttpException(error.message,error.statusCode)
      } else{
        throw new Error("Something Wrong Has been Ocurred checkifuserhas")
      }
   }
  }
}