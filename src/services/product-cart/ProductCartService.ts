
import { IProductCartRepositoryProtocol } from "../../repositories/product-cart/IProductCartRepository";
import { IProductRepositoryProtocol } from "../../repositories/product/IProductRepository";
import { IProductCartServiceProtocol } from "./IProductCartService";
import { AddProductInCartResponseBody, DeleteProductToCartResponse, DeleteProductToProductCart, ProductCartAttributes } from "@interfaces/product-cart";
import { HttpException } from "../../exceptions/HttpException";
import { ICreateUserService } from "@services/auth/IUserAuthService";


export class ProductCartService implements IProductCartServiceProtocol {

  constructor(
      private productRepository:IProductRepositoryProtocol,  
      private repository:IProductCartRepositoryProtocol,
      private userService:ICreateUserService
  ){}

  async add({ product_id, cart_id }: { product_id: any; cart_id: any; }): Promise<AddProductInCartResponseBody> {
    const price = await this.productRepository.getPriceById(product_id)
    await this.repository.create(cart_id,product_id,price)

    return {message:'produto adicionado ao carrinho' }
  }

  private validateIdentifiers(product_id, cart_id){
 
      const invalidIdentifiers = isNaN(product_id) || isNaN(cart_id)
      if(invalidIdentifiers) throw new HttpException("ocorreu um erro na sua requisição",400)
    
  }

  async delete({user_id,product_id, cart_id }:DeleteProductToProductCart): Promise<DeleteProductToCartResponse> {
    try {
      //verify if both identifiers is a number.
      this.validateIdentifiers(product_id,cart_id)
      const isOwner = await this.userService.getById(user_id)
      if(!isOwner) throw new HttpException('Operação não autorizada',403)
      const deletedProduct = await this.repository.remove(product_id,cart_id)
      return deletedProduct
    } catch (error) {
      throw error
    }
  }

  async getAll(cart_id:number): Promise<ProductCartAttributes[]> {
    try {
      const cartList = await this.repository.readAll(cart_id)
      return cartList
    } catch (error) {
      throw error
    }
  }



}