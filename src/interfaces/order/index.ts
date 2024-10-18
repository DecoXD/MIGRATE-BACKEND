import { OrderStatus } from "@prisma/client"

export type CreateOrderAttributes = {
  id:number
  user_id:string
  cart_id:number
  total:number
  status:OrderStatus
}