import { ProductCartAttributes } from "@interfaces/product-cart";
import { prismaClient } from "../../config/dbConfig";
import { IProductCartRepositoryProtocol } from "./IProductCartRepository";

export class ProductCartRepository implements IProductCartRepositoryProtocol {

  constructor(){}

  async create(cart_id: number, product_id: number): Promise<void> {
   try {
      const cart = await prismaClient.productCart.create({
        data:{cart_id,product_id}
      })
      console.log('oi',cart)
   } catch (error) {
      console.log('erro no create in productcart repository',error.message)
      return error
   }
  }

  async remove(productId: number): Promise<void> {
    
  }


  async readAll(cart_id:number): Promise<ProductCartAttributes[]> {
    try {
      
      const cart = await prismaClient.productCart.findMany({ where:{
        cart_id
      }})
      return cart

    } catch (error) {
      console.log(error,'erro no readall productcart repository')
      return error
    }
  }

  async updateQuanty(productId: number): Promise<void> {
    
  }

}