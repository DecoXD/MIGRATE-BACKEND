export type IOrderRepositoryProtocol = {
  create(data:{cartId:number,user_id:string,total:number}):Promise<void>

}