import {  CreateOrderResponseBody, OrderAttributes } from "@interfaces/order";
import { HttpException } from "../../exceptions/HttpException"; 
import { IOrderRepositoryProtocol } from "../../repositories/order/IOrderRepository";
import { IProductCartRepositoryProtocol } from "../../repositories/product-cart/IProductCartRepository";
import { IUserCartRepositoryProtocol } from "../../repositories/user-cart/IUserCartRepository"; 
import { IOrderService } from "./IOrderService";

export class OrderService implements IOrderService {

  constructor(
    private productCartRepository:IProductCartRepositoryProtocol,
    private userCartRepository:IUserCartRepositoryProtocol,
    private repository:IOrderRepositoryProtocol,){

  }
    //criar a ordem com o usuário, o id do carrinho e o valor total
 async createOrder(data:{cart_id: number, user_id: string}): Promise<CreateOrderResponseBody> {
    ///verificar se o carrinho está ativo 
    try {
      const activeCart = await this.userCartRepository.getActiveCartByUserId(data.user_id)
     
      const valid = activeCart.status === "ACTIVE" && data.cart_id === activeCart.id
      if(!valid) throw new HttpException('infelizmente nao foi possivel realizar essa operação',404)

        const productList = await this.productCartRepository.getByCartId(data.cart_id)
      
      const total = productList.reduce((total,productList) =>{
        return total + productList.price
      },0)

      const order = {...data,total}
    
      await Promise.all([
          this.repository.create(order),
          this.userCartRepository.close(data.cart_id)
        ]
      )
      
      return {message:"ordem criada com sucesso"}
 
    } catch (error) {
      throw new Error('alguma coisa aconteceu')
    }
   
  }


  async getByUserId(userId:string):Promise<OrderAttributes[]>{
    try {
      const orderList = await this.repository.getOrderByUserId(userId)
      return orderList
    } catch (error) {
      return error
    }

  }
}