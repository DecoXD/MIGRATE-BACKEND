
import { HttpException } from "../../exceptions/HttpException";
import { AddProductAttributes, AddProductResponseBody, DeleteProductResponseBody, ProductAttributes, UpdatedProductResponseBody, UpdateProductAttributes } from "@interfaces/product"; 
import { IUserRepositoryProtocol } from "../../repositories/auth/IUserRepository"; 
import { IProductRepositoryProtocol } from "../../repositories/product/IProductRepository"; 
import { ITokenManipulator } from "../../utilities/interfaces"; 
import { IProductServiceProtocol } from "./IProductServiceProtocol";
import { allFieldsAreFilled } from "../../utilities/checkFields";
import { ICreateUserService } from "@services/auth/IUserAuthService";


export class ProductService implements IProductServiceProtocol{

  constructor(
    private repository:IProductRepositoryProtocol,
    private userService:ICreateUserService,
    ){

  }



  async add({productData,product_owner}:AddProductAttributes): Promise<AddProductResponseBody> {
    try {
      //verificar se todos os campos estão preenchidos 
    
      const fieldsAreFilled = allFieldsAreFilled(productData)
      Object.assign(productData,{product_owner})
      const product = await this.repository.saveProduct(productData)   
      if(!fieldsAreFilled) throw new HttpException('Por favor Preencha todos os campos',404)
      //pegar o id do usuário pelo token 
      // verificar se ele tem permissão de ADMIN
      return {message:"produto adicionado com sucesso",product}
    } catch (error) {
      if(error instanceof HttpException){
        throw new HttpException(error.message,error.statusCode)
      } 
      throw new Error('System Error')
    }

  }

  async deleteById(productId:number,userId:string): Promise<DeleteProductResponseBody> {
    //verificar permissão do usuário 
    try {
     
      await this.repository.deleteProduct(productId)
      return {message:'produto excluido com sucesso'}
    } catch (error) {
      if(error instanceof HttpException){
        throw new HttpException(error.message,error.statusCode)
      } 
      throw new Error('System Error')
    }
  }

  async update(product: UpdateProductAttributes): Promise<UpdatedProductResponseBody> {
    //verificar se todos os campos estão preenchidos 
    try {
      const fieldsAreFilled = allFieldsAreFilled(product)
      if(!fieldsAreFilled) throw new HttpException('os campos nao estão completamente preenchidos',409)
      
      //verificar se produto existe
      const exists = await this.repository.getProductById(product.id)
      console.log(exists,'oi')
      if(!exists) throw new HttpException("ocorreu um erro ao tentar atualizar seu produto",404)


      const updatedProduct =  await this.repository.updateProduct(product.id,product)
    
    
      if(!updatedProduct) throw new Error('aconteceu algum erro ao atualizar os dados do produto')
      return {message:"produto atualizado com sucesso",product:updatedProduct || null}
    } catch (error) {
      
      return error
    }

    
    //verificar permissão do usuário
  }

  async getAll(){
    try {
      const productList = await this.repository.getAll()

      if(!productList){
       throw new HttpException("nada encontrado",404)
      }
      return productList
    } catch (error) {
      return error
    }
  }

  async getProductById(productId:number):Promise<ProductAttributes>{
    try {
      const product = await this.repository.getProductById(productId)
      if(!product) throw new HttpException('Conteúdo não encontrado',404)
      return product
    } catch (error) {
      return error
    }
  }
}