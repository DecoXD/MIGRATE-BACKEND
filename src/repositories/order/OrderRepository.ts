import { CreateOrderAttributes, OrderAttributes } from "@interfaces/order";
import { prismaClient } from "../../config/dbConfig";
import { IOrderRepositoryProtocol } from "./IOrderRepository";

export class OrderRepository implements IOrderRepositoryProtocol {

  constructor(
    
  ){

  }

  

  async getOrderByUserId(user_id: string): Promise<OrderAttributes[]> {
    try {
      const orderList = await prismaClient.order.findMany({where:{
        user_id:user_id
      }})
      return orderList
    } catch (error) {
      throw new Error(error.message)
    }
  }



  async create(data: { cart_id: number; user_id: string; total: number; }): Promise<CreateOrderAttributes> {
    try {
      const order = await prismaClient.order.create({
        data:{
          total:data.total,
          user_id:data.user_id,
          cart_id:data.cart_id
        },
        
      })
      if(!order) throw new Error('Algo errado aconteceu ao efetuar seu pedido!')
      return order
    } catch (error) {
      throw new Error(error)
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