import { DeleteProductToCartResponse, ProductCartAttributes } from "@interfaces/product-cart";
import { prismaClient } from "../../config/dbConfig";
import { IProductCartRepositoryProtocol } from "./IProductCartRepository";

export class ProductCartRepository implements IProductCartRepositoryProtocol {

  constructor(){}

  async create(cart_id: number, product_id: number,price:number): Promise<void> {
   try {
      const cart = await prismaClient.productCart.create({
        data:{cart_id,product_id,price}
      })
      console.log('oi',cart)
   } catch (error) {
      // console.log('erro no create in productcart repository',error.message)
      throw new Error(error)
   }
  }

  async remove(productId: number,cart_id:number): Promise<DeleteProductToCartResponse> {
    try {
      const deletedProduct = await prismaClient.productCart.delete({where:{
        cart_id_product_id:{
          cart_id,
          product_id:productId
        }
        
      }})
      if(!deletedProduct) throw new Error('Algo de errado aconteceu.')
    } catch (error) {
      return error
    }
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

  async getByCartId(cart_id: number): Promise<ProductCartAttributes[]> {
    try {
      const productList = await prismaClient.productCart.findMany({where:{
        cart_id
      }})
      return productList
    } catch (error) {
      return error 
    }
  }

}