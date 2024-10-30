import { CreateOrderAttributes, CreateOrderResponseBody, OrderAttributes } from "@interfaces/order"

export type IOrderService = {
 createOrder(data:{cart_id: number, user_id: string}):Promise<CreateOrderResponseBody>
 getByUserId(userId:string):Promise<OrderAttributes[]>
}