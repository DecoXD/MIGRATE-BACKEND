import { HttpException } from "../../exceptions/HttpException";
import { IUserRegisterAttributes, IUserLoginAttributes, IUserAttributes, IRegisterResponseBody } from "@interfaces/auth";
import { ICreateUserService } from "./IUserAuthService";
import { IUserRepositoryProtocol } from "../../repositories/auth/IUserRepository";
import bcrypt from 'bcrypt';
import { allFieldsAreFilled } from "../../utilities/checkFields";
import { ITokenManipulator } from "../../utilities/interfaces";
import { UserRole } from "@prisma/client";




export class CreateUserService implements ICreateUserService{

  constructor(private repository:IUserRepositoryProtocol,private tokenManipulator:ITokenManipulator){}

  async emailAlreadyExists(email:string): Promise<IUserAttributes | undefined> {

      const user = await this.repository.getUserByEmail(email)

      if(!user) return 
      
      return user
   
  }

  async passwordMatch(userPassword:string,password:string):Promise<boolean> {

    
      const passwordMatch = await bcrypt.compare(password,userPassword)
      
      if(!passwordMatch) throw new HttpException('email or password are incorrect2',401)
      return true
    
   
  }

  async login(user:IUserLoginAttributes): Promise<void> {
    try {
      
      allFieldsAreFilled(user)
      
      //check if user exists
      
      const userData = await this.emailAlreadyExists(user.email)
      
      if(!userData) throw new HttpException('email or password are incorrect2',401)
      //check if password match
      
      const passwordMatch = await this.passwordMatch(userData.password,user.password)
      if(!passwordMatch) throw new HttpException('email or password are incorrect2',401)
      
      
    } catch (error) {
        return error
    }
  }

  async register(user:IUserRegisterAttributes): Promise<IRegisterResponseBody> {
    try {
      //check if all fields are filled
      
      allFieldsAreFilled(user)
      //check if email exists
      const userExists = await this.emailAlreadyExists(user.email)
      
      if(userExists){
        throw new HttpException('Preencha os dados corretamente',409)
      }
      const newUser = await this.repository.registerUser(user) // talvez deixar o hash para outra classe possa ser uma boa ideia
      //create a token
      if(!newUser) throw new Error('algo errado aconteceu ao tentar criar a sua conta, tente novamente mais tarde')

      const token = await this.tokenManipulator.createToken(newUser.id)

      return {message:'usuário cadastrado com sucesso',token}
    } catch (error) {
      return error
    }
  }


  async registerAdmin(user: IUserRegisterAttributes): Promise<IRegisterResponseBody> {
    try {
      //check if all fields are filled
      allFieldsAreFilled(user)
      //check if email exists
      const userExists = await this.emailAlreadyExists(user.email)
      
      if(userExists){
        throw new HttpException('Preencha os dados corretamente',409)
      }

      const adminData = {...user,role:UserRole.ADMIN}

      const newUser = await this.repository.registerAdmin(adminData) // talvez deixar o hash para outra classe possa ser uma boa ideia
      //create a token
      const token = await this.tokenManipulator.createToken(newUser.id)

      return {message:'usuário cadastrado com sucesso',token}

    } catch (error) {
      if(error instanceof HttpException){
        throw new HttpException(error.message,error.statusCode)
      } else{
        throw new HttpException('System Error',501)
      }
    }
}

  async getById(user_id:string):Promise<IUserAttributes>{
    try {
      const user = await this.repository.getUserById(user_id)
      if(!user) throw new HttpException('usuário não encontrado',404)
      return user

    } catch (error) {
      return error
    }
  }
 
}