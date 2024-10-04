import { IUserCartRepositoryProtocol } from "../../repositories/user-cart/IUserCartRepository";
import { IOrderControllerProtocol } from "./IOrderController";

export class OrderController implements IOrderControllerProtocol {
  constructor(
    private cartRepository:IUserCartRepositoryProtocol,
  


  ){

  }

  async close(): Promise<void> {
    
  }

  async create(): Promise<void> {
    

  }

  async updateStatus(): Promise<void> {
    
  }
}