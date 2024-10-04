import { HttpException } from "../../exceptions/HttpException";
import { CreateUserCartProps, IUserCartAttributes } from "../../interfaces/cart/ICartAttributes";
import { IUserCartRepositoryProtocol } from "../../repositories/user-cart/IUserCartRepository";
import { ITokenManipulator } from "../../utilities/interfaces";
import { TokenManipulator } from "../../utilities/Token";
import { ICartVerificatorProtocol } from "../../utilities/verificators/cart/ICartVerificator";
import { IUserCartControllerProtocol } from "./IUserCartControler";

export class UserCartController implements IUserCartControllerProtocol{
  constructor(
    private repository:IUserCartRepositoryProtocol,
    private verificator:ICartVerificatorProtocol,
    private tokenManipulator:ITokenManipulator
  ){
    
  }

  async createCart({userId}:CreateUserCartProps): Promise<IUserCartAttributes> {
    try {
      const alreadyExists = await this.verificator.checkIfUserHasAnActiveCart(userId)
      console.log(alreadyExists)
      if(alreadyExists) throw new HttpException('this user already has a cart with ACTIVE status',403)

      const newCart = await this.repository.create(userId)
    
      return newCart
  
    } catch (error) {
      
      return error
    }
  }


}