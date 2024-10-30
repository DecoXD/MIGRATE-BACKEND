export type IOrderVerificator = {
  startCreateOrderVerification(cart_id:number,user_id:string):Promise<boolean>
}