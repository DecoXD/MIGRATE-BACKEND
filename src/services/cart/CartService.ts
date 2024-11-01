import { ICartServiceProtocol as IUserCartVerificatorProtocol } from "./ICartService";
import { IUserCartRepositoryProtocol } from "../../repositories/user-cart/IUserCartRepository"; 
import { HttpException } from "../../exceptions/HttpException"; 
import { IUserCartAttributes } from "@interfaces/cart/ICartAttributes";

export class UserCartService implements IUserCartVerificatorProtocol {
  constructor(private repository:IUserCartRepositoryProtocol) {

  }

  async checkIfUserHasAnActiveCart(userId: string): Promise<boolean> {
   try {
    if(!userId) throw new HttpException('user not found when check if has an active cart',401)
    const userCart = await this.repository.getActiveCartByUserId(userId)
    //se o usuário ja possui um carrinho ativo eu nao vou criar
    if(userCart) return true // % meio redundante mas nao influencia na logica.

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


  async create(userId:string){
    try {
      const alreadyExists = await this.checkIfUserHasAnActiveCart(userId)
      
      if(alreadyExists) throw new HttpException('this user already has a cart with ACTIVE status',403)
      const newCart = await this.repository.create(userId)
      return newCart
      
    } catch (error) {
      return error
    }
  }

  async getAllUserCarts(userId: string): Promise<IUserCartAttributes[]> {
    try {
      const cartList = await this.repository.getAllUserCarts(userId)
      return cartList
    } catch (error) {
      return error
    }
  }
}
