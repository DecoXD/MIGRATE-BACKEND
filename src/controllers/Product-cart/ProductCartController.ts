import { IProductCartServiceProtocol } from "@services/product-cart/IProductCartService";
import { IOrderRepositoryProtocol } from "../../repositories/order/IOrderRepository";
import { IProductCartRepositoryProtocol } from "../../repositories/product-cart/IProductCartRepository";
import { IProductRepositoryProtocol } from "../../repositories/product/IProductRepository";
import { IUserCartRepositoryProtocol } from "../../repositories/user-cart/IUserCartRepository";
import { IProductCartControllerProtocol } from "./IProductCartController";
import { DeleteProductToCartResponse } from "@interfaces/product-cart";


export class ProductCartController implements IProductCartControllerProtocol{
  constructor(
    
    private service:IProductCartServiceProtocol
    
    
  ){}

  async add({product_id,cart_id}: { product_id: number; cart_id: number;}) {
   try {
    const newProductCart = await this.service.add({product_id,cart_id})
    return newProductCart
   } catch (error) {
    //aq
    console.log('erro no add product cart controller')
    return error
   }
  }

  async delete(user_id:string,productId: number,cart_id:number): Promise<DeleteProductToCartResponse  > {
    try {
      const response = await this.service.delete({user_id,product_id:productId,cart_id})
      return response
    } catch (error) {
      return error
    }
  }

  async bundling(data: { cartId: number; user_id: string; total: number; }): Promise<void> {
    try {
      //verificar se o carrinho está ativo 
      //alterar o status do carrinho para fechado 
      //enviar o id do carrinho para criar a ordem
      
      
      
    } catch (error) {
      return error
    }
  }

  async getAll(cart_id:number){
    try {
      const cartItems = await this.service.getAll(cart_id) 
      return cartItems
    } catch (error) {
      return error
     
    }
  }
}