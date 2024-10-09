import { IUserCartAttributes } from "@interfaces/cart/ICartAttributes";
import { IUserCartRepositoryProtocol } from "./IUserCartRepository";
import { prismaClient } from "../../config/dbConfig";

export class UserCartRepository implements IUserCartRepositoryProtocol{
  async create(userId: string) {
   try {
    const cart = await prismaClient.cart.create({data:{
      user_id:userId
    }
    })
    
    return cart
   } catch (error) {
    return error
   }
  }

  async close(cartId:number):Promise<void> {
    try {
      const cart = await prismaClient.cart.update({where:{
        id:cartId
      },data:{
        status:"CLOSED"
      }})
      return 
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async getActiveCartByUserId(userId: string): Promise<IUserCartAttributes> {
    try {
      const cart = await prismaClient.cart.findFirst({where:{
        user_id:userId,
        status:"ACTIVE"
      }})
     
      return cart
    } catch (error) {
      throw new Error(error.massage)
    }
  }

  async getAllUserCarts(user_id: string) {
    try {
      const cartList = await prismaClient.cart.findMany({where:{
        user_id
      }})
      return cartList
    } catch (error) {
      return error
    }
  }
}