import { Request, Response } from "express";
import { IUserRepositoryProtocol } from "../../../repositories/auth/IUserRepository";
import { HttpException } from "../../../exceptions/HttpException";
import { IUserAuthControllerProtocol } from "./IUserController";
import { ICreateUserVerificator } from "../../../utilities/verificators/auth/IUserAuthVerificator";
import { ITokenManipulator } from "../../../utilities/interfaces";
import { UserRole } from "@prisma/client";
import { IUserAttributes } from "@interfaces/auth";


export class UserController implements IUserAuthControllerProtocol{
  
  constructor( private repository:IUserRepositoryProtocol, private verificator:ICreateUserVerificator,private tokenManipulator:ITokenManipulator){
    
  }
  
  async createUser(req: Request, res: Response): Promise<Response> {
    //implements zod verification 
    const {name,email,password} = req.body
    const data = {
      name,
      email,
      password, 
    }
    try {
      //initialize register verification
      
      await this.verificator.startRegisterVerification(data)
      const newUser = await this.repository.registerUser(data) // talvez deixar o hash para outra classe possa ser uma boa ideia
      //create a token
      const token = await this.tokenManipulator.createToken(newUser.id)
      return res.status(201).json({user:newUser,message:'Usuário cadastrado com sucesso',token})

    } catch (error) {
      if(error instanceof HttpException){
       return res.status(error.statusCode).json({message:error.message})
      }   else{
        throw new HttpException('system error create user',501)
      }
    }
  }

  async createAdminAccount(req:Request,res:Response):Promise<Response>{
    const {name,email,password} = req.body
    const data = {
      name,
      email,
      password, 
      role:UserRole.ADMIN
    }
    try {
      //initialize register verification
      
      await this.verificator.startRegisterVerification(data)
      const newUser = await this.repository.registerUser(data) // talvez deixar o hash para outra classe possa ser uma boa ideia
      //create a token
      const token = await this.tokenManipulator.createToken(newUser.id)
      return res.status(201).json({user:newUser,message:'Usuário cadastrado com sucesso',token})

    } catch (error) {
      if(error instanceof HttpException){
       return res.status(error.statusCode).json({message:error.message})
      }   else{
        throw new HttpException('system error create user',501)
      }
    }
  }

  async toAccessUser(req:Request,res:Response):Promise<Response> {
    const {email,password} = req.body
    const data = {
      email,
      password
    }
    try {
      // the responsability to verify if email exists and password and if others business rules matches is directed to verificator      
      await this.verificator.startLoginVerification(data)     
       const user = await this.repository.getUserByEmail(email)
      //send token to registred    
      const token = await this.tokenManipulator.createToken(user.id)
      return res.status(200).json({message:'ok',token})
      //handling login
    } catch (error) {
      if(error instanceof HttpException){
        res.status(error.statusCode).json({message:error.message})
      } else{
        res.status(501).json({message:"system error usercontroller"})
      }
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