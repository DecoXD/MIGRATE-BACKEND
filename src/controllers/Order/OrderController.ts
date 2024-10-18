import { CreateOrderAttributes } from "@interfaces/order";
import { IOrderRepositoryProtocol } from "../../repositories/order/IOrderRepository";
import { IProductCartRepositoryProtocol } from "../../repositories/product-cart/IProductCartRepository";
import { IUserCartRepositoryProtocol } from "../../repositories/user-cart/IUserCartRepository";

import { IOrderControllerProtocol } from "./IOrderController";
import { IOrderVerificator } from "../../utilities/verificators/order/IOrderVerificator";

export class OrderController implements IOrderControllerProtocol {
  constructor(
    private productCartRepository:IProductCartRepositoryProtocol,
    private userCartRepository:IUserCartRepositoryProtocol,
    private repository:IOrderRepositoryProtocol,
    private verificator:IOrderVerificator
    
  ){

  }

  async close(): Promise<void> {
    
  }

  async create(data:{user_id:string,cart_id:number}): Promise<CreateOrderAttributes> {
    //calcular o total somando todos os valores dos produtos ligados ao carrinho

    try {
      await this.verificator.startCreateOrderVerification(data.cart_id,data.user_id)
      const productList = await this.productCartRepository.getByCartId(data.cart_id)
      
      const total = productList.reduce((total,productList) =>{
        return total + productList.price
      },0)

      const res = {...data,total}
    
      const[order,cart] = await Promise.all([
          this.repository.create(res),
          this.userCartRepository.close(data.cart_id)
        ]
      )
  
      return order
      
    
    } catch (error) {
      return error
    }
    //criar a ordem com o usuário, o id do carrinho e o valor total

  }

  async updateStatus(): Promise<void> {
    
  }

  async getByUserId(user_id: string): Promise<{ cart_id: number; user_id: string; total: number; status: "PENDING" | "COMPLETED"; }[]> {
    try {
      const orderList = await this.repository.getOrderByUserId(user_id)
      return orderList
    } catch (error) {
      return error
    }
  }
}