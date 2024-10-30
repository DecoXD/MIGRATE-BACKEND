import { CreateOrderAttributes, OrderAttributes } from "@interfaces/order"

export type IOrderRepositoryProtocol = {
  create(data:{cart_id:number,user_id:string,total:number}):Promise<CreateOrderAttributes>
  readOrders(order_id:number):Promise<void>
  updateOrderStatus(order_id:number):Promise<void>
  calculateTotalCartAmount(cart_id):Promise<void>
  getOrderByUserId(user_id:string):Promise<OrderAttributes[]>
}