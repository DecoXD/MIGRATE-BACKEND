import { Request, Response } from "express";
import { IUserRepositoryProtocol } from "../../../repositories/auth/IUserRepository";
import { HttpException } from "../../../exceptions/HttpException";
import { IUserAuthControllerProtocol } from "./IUserController";
import { ICreateUserVerificator } from "../../../utilities/verificators/auth/IUserAuthVerificator";
import { ITokenManipulator } from "../../../utilities/interfaces";
import { UserRole } from "@prisma/client";
import { IAdminRegisterAttributes, ICreateUserResponse, IUserAttributes, IUserLoginAttributes, IUserLoginResponse, IUserRegisterAttributes } from "@interfaces/auth";


export class UserController implements IUserAuthControllerProtocol{
  
  constructor( private repository:IUserRepositoryProtocol, private verificator:ICreateUserVerificator,private tokenManipulator:ITokenManipulator){
    
  }
  
  async createUser(data:IUserRegisterAttributes): Promise<ICreateUserResponse> {
    //implements zod verification 
    
    try {
      //initialize register verification
      
      await this.verificator.startRegisterVerification(data)
      const newUser = await this.repository.registerUser(data) // talvez deixar o hash para outra classe possa ser uma boa ideia
      //create a token
      const token = await this.tokenManipulator.createToken(newUser.id)
      return {newUser,token}

    } catch (error) {
      return error
    }
  }

  async createAdminAccount(data:IAdminRegisterAttributes):Promise<ICreateUserResponse>{
    
    try {
      //initialize register verification
      
      await this.verificator.startRegisterVerification(data)
      const newUser = await this.repository.registerUser(data) // talvez deixar o hash para outra classe possa ser uma boa ideia
      //create a token
      const token = await this.tokenManipulator.createToken(newUser.id)
      return {newUser,token}

    } catch (error) {
      return error
    }
  }

  async toAccessUser(data:IUserLoginAttributes):Promise<IUserLoginResponse> {
   
    try {
      await this.verificator.startLoginVerification(data)     
      const user = await this.repository.getUserByEmail(data.email)
      
      const token = await this.tokenManipulator.createToken(user.id)
      return {message:"acesso autorizado!",token}
     
    } catch (error) {
      return error
    }




  }

  async getUser(id: string): Promise<IUserAttributes> {
    try {
      const user = await this.repository.getUserById(id)
      if(!user) throw new HttpException('usuário nao encontrado',404)
      
      return user
    } catch (error) {
      return error
    }
  }

}