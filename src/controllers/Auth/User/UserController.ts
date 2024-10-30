import { IUserRepositoryProtocol } from "../../../repositories/auth/IUserRepository";
import { HttpException } from "../../../exceptions/HttpException";
import { IUserAuthControllerProtocol } from "./IUserController";
import { ICreateUserService } from "../../../services/auth/IUserAuthService";
import { ITokenManipulator } from "../../../utilities/interfaces";
import { IAdminRegisterAttributes, ICreateUserResponse, IRegisterResponseBody, IUserAttributes, IUserLoginAttributes, IUserLoginResponse, IUserRegisterAttributes } from "@interfaces/auth";


export class UserController implements IUserAuthControllerProtocol{
  
  constructor( private repository:IUserRepositoryProtocol, private service:ICreateUserService,private tokenManipulator:ITokenManipulator){
    
  }
  
  async createUser(data:IUserRegisterAttributes): Promise<IRegisterResponseBody> {
    //implements zod verification 
    
    try {
      const {message,token} = await this.service.register(data)
     
      return {message,token}

    } catch (error) {
      return error
    }
  }

  async createAdminAccount(data:IAdminRegisterAttributes):Promise<IRegisterResponseBody>{
    
    try {
      //initialize register verification

      const { message,token}=await this.service.registerAdmin(data)
    
      return {message,token}

    } catch (error) {
      return error
    }
  }

  async toAccessUser(data:IUserLoginAttributes):Promise<IUserLoginResponse> {
   
    try {
      await this.service.login(data)     
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