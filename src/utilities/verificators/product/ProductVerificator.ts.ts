import { Request } from "express";
import { HttpException } from "../../../exceptions/HttpException";
import { ProductAttributes } from "../../../interfaces/product";
import { IUserRepositoryProtocol } from "../../../repositories/auth/IUserRepository";
import { IProductRepositoryProtocol } from "../../../repositories/product/IProductRepository";
import { ITokenManipulator } from "../../interfaces";
import { IProductVerificatorProtocol } from "./IProductVerificatorProtocol";
import { allFieldsAreFilled } from "../../checkFields";

export class ProductVerificator implements IProductVerificatorProtocol{

  constructor(
    private productService:IProductRepositoryProtocol,
    private userService:IUserRepositoryProtocol,
    private tokenManipulator:ITokenManipulator){

  }



  async verifyUserPermissions(userId:string):Promise<boolean>{
    try {
      const user = await this.userService.getUserById(userId)
      const adminCode = process.env.APP_ADMIN_CODE
      
      if(user.role != adminCode){
        throw new HttpException('você não tem permissão para realizar essa operação',403)
      }
      return true
    } catch (error) {
      if(error instanceof HttpException){
        throw new HttpException(error.message,error.statusCode)
      } 
      throw new Error('System Error')
    }
  }

  async addProductVerificator(req:Request,product: ProductAttributes): Promise<string> {
    try {
      //verificar se todos os campos estão preenchidos 
    
      const fieldsAreFilled = allFieldsAreFilled(product)
      
      if(!fieldsAreFilled) throw new HttpException('Por favor Preencha todos os campos',404)
      //pegar o id do usuário pelo token 

      const token = await this.tokenManipulator.getToken(req)
      
      const id = await this.tokenManipulator.getUserByToken(token)

      if(!id) throw new HttpException('você nao possui permissão para realizar essa operação',403)
      // verificar se ele tem permissão de ADMIN
      return id
    } catch (error) {
      if(error instanceof HttpException){
        throw new HttpException(error.message,error.statusCode)
      } 
      throw new Error('System Error')
    }

  }

  async deleteProductVerificator(req:Request,product: ProductAttributes): Promise<void> {
    //verificar permissão do usuário 
    try {
      const token = await this.tokenManipulator.getToken(req)
      const {userId} = await this.tokenManipulator.getUserByToken(token)
      await this.verifyUserPermissions(userId)
    } catch (error) {
      if(error instanceof HttpException){
        throw new HttpException(error.message,error.statusCode)
      } 
      throw new Error('System Error')
    }
  }

  async updateProductVerificator(product: ProductAttributes): Promise<void> {
    //verificar se todos os campos estão preenchidos 
    //verificar permissão do usuário
  }
}