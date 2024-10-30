import { CreateOrderResponseBody, OrderAttributes } from "@interfaces/order";
import { IOrderControllerProtocol } from "./IOrderController";
import { IOrderService } from "@services/order/IOrderService"; 

export class OrderController implements IOrderControllerProtocol {
  constructor(
    private service:IOrderService
    
  ){

  }

  async close(): Promise<void> {
    
  }

  async create(data:{user_id:string,cart_id:number}): Promise<CreateOrderResponseBody> {
    //calcular o total somando todos os valores dos produtos ligados ao carrinho

    try {
      const response = await this.service.createOrder(data)
      return response
    
    } catch (error) {
      return error
    }


  }

  async updateStatus(): Promise<void> {
    
  }

  async getByUserId(user_id: string): Promise<OrderAttributes[]> {
    try {
      const orderList = await this.service.getByUserId(user_id)
      return orderList
    } catch (error) {
      return error
    }
  }
}