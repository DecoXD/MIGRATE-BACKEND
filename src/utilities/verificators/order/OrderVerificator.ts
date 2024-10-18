import { HttpException } from "../../../exceptions/HttpException";
import { IUserCartRepositoryProtocol } from "../../../repositories/user-cart/IUserCartRepository";
import { IOrderVerificator } from "./IOrderVerificator";

export class OrderVerificator implements IOrderVerificator {

  constructor(private userCartRepository:IUserCartRepositoryProtocol){

  }

 async startCreateOrderVerification(cart_id: number, user_id: string): Promise<boolean> {
    ///verificar se o carrinho está ativo 
    try {
      const activeCart = await this.userCartRepository.getActiveCartByUserId(user_id)
     
      const valid = activeCart.status === "ACTIVE" && cart_id === activeCart.id
      if(!valid) throw new HttpException('infelizmente nao foi possivel realizar essa operação',404)
      return valid
    } catch (error) {
      throw new Error('alguma coisa aconteceu')
    }
   
  }
}