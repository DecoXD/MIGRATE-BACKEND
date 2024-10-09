import { IOrderRepositoryProtocol } from "../../repositories/order/IOrderRepository";
import { IProductCartRepositoryProtocol } from "../../repositories/product-cart/IProductCartRepository";
import { IProductRepositoryProtocol } from "../../repositories/product/IProductRepository";
import { IUserCartRepositoryProtocol } from "../../repositories/user-cart/IUserCartRepository";
import { IProductCartControllerProtocol } from "./IProductCartController";


export class ProductCartController implements IProductCartControllerProtocol{
  constructor(
    private userCartRepository:IUserCartRepositoryProtocol,
    private productRepository:IProductRepositoryProtocol,
    private orderRepository:IOrderRepositoryProtocol,//create interface
    private repository:IProductCartRepositoryProtocol,
    // private productCartVerificator//create interface
    
    
  ){}

  async add({product_id,cart_id}: { product_id: number; cart_id: number;}) {
   try {
    const price = await this.productRepository.getPriceById(product_id)
    
    const newProductCart = await this.repository.create(cart_id,product_id,price)
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
      //alterar o status do carrinho para fechado 
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
      return error
      console.log(error,'controller getAll')
    }
  }
}