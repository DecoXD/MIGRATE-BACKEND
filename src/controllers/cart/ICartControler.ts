export type ICartControllerProtocol = {
  addProduct():Promise<void>
  removeProduct():Promise<void>
  updateProductQty():Promise<void>
  clearCart():Promise<void>
  readCart():Promise<void>


}