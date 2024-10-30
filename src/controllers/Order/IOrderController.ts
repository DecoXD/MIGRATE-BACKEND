import { CreateOrderAttributes, CreateOrderResponseBody, OrderAttributes } from "@interfaces/order"



// ordem => pega id da ordem => cria um ordem item com o id da ordem e os produtos
export type IOrderControllerProtocol = {
  create(data:{user_id:string,cart_id:number}):Promise<CreateOrderResponseBody>
  updateStatus():Promise<void>
  close():Promise<void>
  getByUserId(user_id:string):Promise<OrderAttributes[]>
}