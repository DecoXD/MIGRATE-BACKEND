import { prismaClient } from "../../config/dbConfig";
import { IOrderRepositoryProtocol } from "./IOrderRepository";

export class OrderRepository implements IOrderRepositoryProtocol {

  constructor(
    
  ){

  }

  async create(data: { cart_id: number; user_id: string; total: number; }): Promise<void> {
    try {
      await prismaClient.order.create({
        data:{
          total:data.total,
          user_id:data.user_id,
          cart_id:data.cart_id
        },
        
      })
    } catch (error) {
      
    }
  }

  async readOrders(order_id: number): Promise<void> {
    
  }


  async updateOrderStatus(order_id: number): Promise<void> {
    
  }

  async calculateTotalCartAmount(cart_id: any): Promise<void> {
    try {
      
    } catch (error) {
      
    }
  }
}