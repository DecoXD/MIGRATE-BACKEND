type OrderAttributes = {
  cart_id:number
  user_id:string
  total: number
  status:"PENDING"|"COMPLETED"

}

// ordem => pega id da ordem => cria um ordem item com o id da ordem e os produtos
export type IOrderControllerProtocol = {
  create():Promise<void>
  updateStatus():Promise<void>
  close():Promise<void>
}