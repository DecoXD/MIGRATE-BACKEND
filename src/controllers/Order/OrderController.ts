import { IOrderRepositoryProtocol } from "../../repositories/order/IOrderRepository";
import { IProductCartRepositoryProtocol } from "../../repositories/product-cart/IProductCartRepository";
import { IUserCartRepositoryProtocol } from "../../repositories/user-cart/IUserCartRepository";

import { IOrderControllerProtocol } from "./IOrderController";

export class OrderController implements IOrderControllerProtocol {
  constructor(
    private productCartRepository:IProductCartRepositoryProtocol,
    private userCartRepository:IUserCartRepositoryProtocol,
    private repository:IOrderRepositoryProtocol
    
  ){

  }

  async close(): Promise<void> {
    
  }

  async create(data:{user_id:string,cart_id:number}): Promise<void> {
    //calcular o total somando todos os valores dos produtos ligados ao carrinho

    try {

      const productList = await this.productCartRepository.getByCartId(data.cart_id)
      
      const total = productList.reduce((total,productList) =>{
        return total + productList.quanty
      },0)

      Object.assign(data,total)

      const[order,cart] = await Promise.all(
        [
          this.repository.create(data),
          this.userCartRepository.close(data.cart_id)
        ]
      )
  

      
      

    } catch (error) {
      
    }
    //criar a ordem com o usuário, o id do carrinho e o valor total

  }

  async updateStatus(): Promise<void> {
    
  }
}