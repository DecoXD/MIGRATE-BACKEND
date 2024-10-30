import { IAdminRegisterAttributes, IRegisterResponseBody, IUserAttributes, IUserLoginAttributes, IUserLoginResponse, IUserRegisterAttributes } from "@interfaces/auth";


export type IUserAuthControllerProtocol = {
  createUser(data:IUserRegisterAttributes):Promise<IRegisterResponseBody>,
  toAccessUser(data:IUserLoginAttributes):Promise<IUserLoginResponse>,
  createAdminAccount(data:IAdminRegisterAttributes):Promise<IRegisterResponseBody>
  getUser(id:string):Promise<IUserAttributes>
  // updateUserById(req:Request,res:Response):Promise<Response>,

}