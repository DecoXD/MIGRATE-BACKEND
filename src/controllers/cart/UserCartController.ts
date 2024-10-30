import { HttpException } from "../../exceptions/HttpException";
import { CreateUserCartProps, IUserCartAttributes } from "../../interfaces/cart/ICartAttributes";
import { IUserCartRepositoryProtocol } from "../../repositories/user-cart/IUserCartRepository";
import { ITokenManipulator } from "../../utilities/interfaces";
import { ICartServiceProtocol } from "@services/cart/ICartService"; 
import { IUserCartControllerProtocol } from "./IUserCartControler";

export class UserCartController implements IUserCartControllerProtocol{
  constructor(
    private service:ICartServiceProtocol,
  ){
    
  }

  async createCart({userId}:CreateUserCartProps): Promise<IUserCartAttributes> {
    try {
      
      const newCart = await this.service.create(userId)
      return newCart
  
    } catch (error) {
      
      return error
    }
  }

  async getAllUserCart(userId:string){
    try {
      const cartList = await this.service.getAllUserCarts(userId)
      return cartList
    } catch (error) {
      return error
    }
  }



}