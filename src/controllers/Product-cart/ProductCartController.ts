import { prismaClient } from "../../config/dbConfig";
import { IOrderRepositoryProtocol } from "../../repositories/order/IOrderRepository";
import { IProductCartRepositoryProtocol } from "../../repositories/product-cart/IProductCartRepository";
import { IUserCartRepositoryProtocol } from "../../repositories/user-cart/IUserCartRepository";
import { IUserCartControllerProtocol } from "../cart/IUserCartControler";
import { IProductControllerProtocol } from "../Products/IProductController";
import { IProductCartControllerProtocol } from "./IProductCartController";

export class ProductCartController implements IProductCartControllerProtocol{
  constructor(
    private userCartRepository:IUserCartRepositoryProtocol,
    private productController:IProductControllerProtocol,
    private orderRepository:IOrderRepositoryProtocol,//create interface
    private repository:IProductCartRepositoryProtocol,
    // private productCartVerificator//create interface
    
    
  ){}

  async add({product_id,cart_id}: { product_id: number; cart_id: number; }) {
   try {
    const newProductCart = await this.repository.create(cart_id,product_id)
    return newProductCart
   } catch (error) {
    console.log('erro no add product cart controller')
    return error
   }
  }

  async delete(productId: number): Promise<void> {
    
  }

  async bundling(data: { cartId: number; user_id: string; total: number; }): Promise<void> {
    try {
      //verificar se o carrinho está ativo 
     
      await this.orderRepository.create(data)
      //alterar o status do carrinho para fechado
      await this.userCartRepository.close(data.cartId)
      
      //enviar o id do carrinho para criar a ordem
      
    } catch (error) {
      return error
    }
  }

  async getAll(cart_id:number){
    try {
      const cartItems = await this.repository.readAll(cart_id) 
      return cartItems
    } catch (error) {
      console.log(error,'controller getAll')
    }
  }
}