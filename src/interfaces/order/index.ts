import { OrderStatus } from "@prisma/client"

export type CreateOrderAttributes = {
  id:number
  user_id:string
  cart_id:number
  total:number
  status:OrderStatus
}

export type CreateOrderResponseBody = {
  message:string,

}

export type OrderAttributes = {
  cart_id:number
  user_id:string
  total: number
  status:"PENDING"|"COMPLETED"

}