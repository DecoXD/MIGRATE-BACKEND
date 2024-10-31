import { IUserRegisterAttributes, IUserLoginAttributes, IUserAttributes, IRegisterResponseBody } from "@interfaces/auth"

export type ICreateUserService = {
  passwordMatch(userPassword:string,password:string):Promise<boolean>,
  emailAlreadyExists(email:string):Promise<IUserAttributes | undefined>
  login(user:IUserLoginAttributes):Promise<void>
  register(user:IUserRegisterAttributes):Promise<IRegisterResponseBody>
  registerAdmin(user:IUserRegisterAttributes):Promise<IRegisterResponseBody>
  getById(user_id:string):Promise<IUserAttributes>
}