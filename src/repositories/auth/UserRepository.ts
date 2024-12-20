//realizar o crud aqui

/*eslint disable */
import { prismaClient } from "../../config/dbConfig";
import { HttpException } from "../../exceptions/HttpException";
import { IAdminRegisterAttributes, IUserAttributes, IUserRegisterAttributes } from "../../interfaces/auth";

import { IUserRepositoryProtocol } from "./IUserRepository";
import bcrypt from 'bcrypt';



export class UserRepository implements IUserRepositoryProtocol {


  constructor(){}



  async registerUser(userData: IUserRegisterAttributes) {
    try {
      const {name,email,password} = userData
     
      const salt = bcrypt.genSaltSync(12)
      const hashPassword = bcrypt.hashSync(password,salt)// refatorar 
     
      const newUser = {
        name,
        email,
        password:hashPassword,
        
      }

      const user = await prismaClient.user.create({
        data:newUser
      })
      if(!user){
        throw new Error()
      }
      return user
    } catch (error) {
      throw new Error("ocorreu um erro ao tentar criar sua conta admin")
    }
  
  
  }

  async registerAdmin(adminData:IAdminRegisterAttributes){
    try {
      const {name,email,password,role} = adminData
     
      const salt = bcrypt.genSaltSync(12)
      const hashPassword = bcrypt.hashSync(password,salt)// refatorar 
     
      const newUser = {
        name,
        email,
        password:hashPassword,
        role
        
      }

      const user = await prismaClient.user.create({
        data:newUser
      })
      if(!user){
        throw new HttpException('unknown error',500)
      }
      return user
    } catch (error) {
      throw new Error("ocorreu um erro ao tentar criar sua conta")
    }
    
  }
  async getUserById(id:string):Promise<IUserAttributes >{
   
    const user = await  prismaClient.user.findUnique({ where:{
      id:id
    },select:{
      name:true,
      email:true,
      id:true,
      role:true,
      

    }})
    
    if(!user) throw new HttpException('user not found',401)
    return user

  }

  async getUserByEmail(email:string){
   
    try {
      const user = await  prismaClient.user.findUnique({ where:{
        email:email
        }})
        return user
    } catch (error) {
      throw new HttpException(error.message,500)
    }

  }

  async getAllUsers(): Promise<IUserRegisterAttributes[]> {
    const user = await prismaClient.user.findMany()
    return user
  }

  async updateUser(id:string,data:IUserRegisterAttributes){
    await prismaClient.user.update({
      where:{
        id:id
      },
      data:data

    })
  }

  async unregisterUser(id:string):Promise<void>{}
}