export type ICartRepositoryProtocol = {
  add():Promise<void>
  readAll():Promise<void>
  clear():Promise<void>
  deleteOne():Promise<void>
  updateQty():Promise<void>
}