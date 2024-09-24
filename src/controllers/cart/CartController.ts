import { ICartRepositoryProtocol } from "../../repositories/cart/ICartRepository";
import { ICartVerificatorProtocol } from "../../utilities/verificators/cart/ICartVerificator";
import { ICartControllerProtocol } from "./ICartControler";

export class CartController implements ICartControllerProtocol{
  constructor(
    private repository:ICartRepositoryProtocol,
    private verificator:ICartVerificatorProtocol){

  }

  async addProduct(): Promise<void> {
    try {
      console.log('produto adicionado')
    } catch (error) {
      
    }
  }

  async clearCart(): Promise<void> {
    
  }

  async removeProduct(): Promise<void> {
    
  }

  async updateProductQty(): Promise<void> {
    
  }

  async readCart(): Promise<void> {
    
  }
}