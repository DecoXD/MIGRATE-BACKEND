export type IOrderRepositoryProtocol = {
  create(data:{cart_id:number,user_id:string,total:number}):Promise<void>
  readOrders(order_id:number):Promise<void>
  updateOrderStatus(order_id:number):Promise<void>
  calculateTotalCartAmount(cart_id):Promise<void>
}