import { IProductCartRepositoryProtocol } from "../../repositories/product-cart/IProductCartRepository";
import { IUserCartControllerProtocol } from "../cart/IUserCartControler";
import { IProductControllerProtocol } from "../Products/IProductController";
import { IProductCartControllerProtocol } from "./IProductCartController";

export class ProductCartController implements IProductCartControllerProtocol{
  constructor(
    private userCartController:IUserCartControllerProtocol,
    private productController:IProductControllerProtocol,
    // private orderController,//create interface
    private repository:IProductCartRepositoryProtocol,
    // private productCartVerificator//create interface
    
    
  ){}

  async add({product_id,cart_id}: { product_id: number; cart_id: number; }) {
   try {
    const newProductCart = await this.repository.create(cart_id,product_id)
    return newProductCart
   } catch (error) {
    console.log('erro no add product cart controller')
    return error
   }
  }

  async delete(productId: number): Promise<void> {
    
  }

  async bundling(data: { cartId: number; user_id: string; total: number; }): Promise<void> {
    
  }

  async getAll(cart_id:number){
    try {
      const cartItems = await this.repository.readAll(cart_id) 
      return cartItems
    } catch (error) {
      console.log(error,'controller getAll')
    }
  }
}