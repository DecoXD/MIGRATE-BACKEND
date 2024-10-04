import { IUserRegisterAttributes, IUserLoginAttributes } from "../../../interfaces/auth"

export type ICreateUserVerificator = {
  passwordMatch(userPassword:string,password:string):Promise<boolean>,
  emailAlreadyExists(email:string):Promise<IUserRegisterAttributes | undefined>
  startLoginVerification(user:IUserLoginAttributes):Promise<void>
  startRegisterVerification(user:IUserRegisterAttributes):Promise<void>


}