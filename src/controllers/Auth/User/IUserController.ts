import { IAdminRegisterAttributes, ICreateUserResponse, IUserAttributes, IUserLoginAttributes, IUserLoginResponse, IUserRegisterAttributes } from "@interfaces/auth";
import { Request, Response } from "express";

export type IUserAuthControllerProtocol = {
  createUser(data:IUserRegisterAttributes):Promise<ICreateUserResponse>,
  toAccessUser(data:IUserLoginAttributes):Promise<IUserLoginResponse>,
  createAdminAccount(data:IAdminRegisterAttributes):Promise<ICreateUserResponse>
  getUser(id:string):Promise<IUserAttributes>
  // updateUserById(req:Request,res:Response):Promise<Response>,

}