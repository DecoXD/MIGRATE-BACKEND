import { HttpException } from "../../../exceptions/HttpException";
import { IUserRegisterAttributes, IUserLoginAttributes } from "../../../interfaces/auth";
import { ICreateUserVerificator } from "./IUserAuthVerificator";
import { IUserRepositoryProtocol } from "../../../repositories/auth/IUserRepository";
import bcrypt from 'bcrypt';
import { allFieldsAreFilled } from "../../checkFields";
import { ITokenManipulator } from "../../interfaces";
import { Request } from "express";


export class CreateUserVerificator implements ICreateUserVerificator{

  constructor(private repository:IUserRepositoryProtocol){}

  async emailAlreadyExists(email:string): Promise<IUserRegisterAttributes | undefined> {

      const user = await this.repository.getUserByEmail(email)

      if(!user) return 
      
      return user
   
  }

  async passwordMatch(userPassword:string,password:string):Promise<boolean> {

    
      const passwordMatch = await bcrypt.compare(password,userPassword)
      
      if(!passwordMatch) throw new HttpException('email or password are incorrect2',401)
      return true
    
   
  }

  async startLoginVerification(user:IUserLoginAttributes): Promise<void> {
    try {
      
      allFieldsAreFilled(user)
      
      //check if user exists
      
      const userData = await this.emailAlreadyExists(user.email)
      
      if(!userData) throw new HttpException('email or password are incorrect2',401)
      //check if password match
      
      const passwordMatch = await this.passwordMatch(userData.password,user.password)
      if(!passwordMatch) throw new HttpException('email or password are incorrect2',401)
      
    } catch (error) {
        if(error instanceof HttpException){
          throw new HttpException(error.message,error.statusCode)
        } else{
          console.log(error instanceof HttpException)
          throw new HttpException('server error ',501)
        }
    }
  }

  async startRegisterVerification(user:IUserRegisterAttributes): Promise<void> {
    try {
      //check if all fields are filled
      allFieldsAreFilled(user)
      //check if email exists
      const userExists = await this.emailAlreadyExists(user.email)
      
      if(userExists){
        throw new HttpException('Preencha os dados corretamente',409)
      }
    } catch (error) {
      if(error instanceof HttpException){
        throw new HttpException(error.message,error.statusCode)
      } else{
        throw new HttpException('System Error',501)
      }
    }
  }

 
}