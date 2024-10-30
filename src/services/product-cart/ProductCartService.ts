import { AddProductResponseBody } from "@interfaces/product";
import { IProductCartRepositoryProtocol } from "../../repositories/product-cart/IProductCartRepository";
import { IProductRepositoryProtocol } from "../../repositories/product/IProductRepository";
import { IProductCartServiceProtocol } from "./IProductCartService";
import { AddProductInCartResponseBody, ProductCartAttributes } from "@interfaces/product-cart";


export class ProductCartService implements IProductCartServiceProtocol {

  constructor(
      private productRepository:IProductRepositoryProtocol,  
      private repository:IProductCartRepositoryProtocol,
  ){}

  async add({ product_id, cart_id }: { product_id: any; cart_id: any; }): Promise<AddProductInCartResponseBody> {
    const price = await this.productRepository.getPriceById(product_id)
    await this.repository.create(cart_id,product_id,price)

    return {message:'produto adicionado ao carrinho' }
  }

  async delete({ product_id, cart_id }: { product_id: any; cart_id: any; }): Promise<void> {
    
  }

  async getAll(cart_id:number): Promise<ProductCartAttributes[]> {
    try {
      const cartList = await this.repository.readAll(cart_id)
      return cartList
    } catch (error) {
      
    }
  }



}