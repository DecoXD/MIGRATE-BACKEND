import { IUserAttributes, IUserRegisterAttributes } from "@interfaces/auth";
import { Request, Response } from "express";

export type IUserAuthControllerProtocol = {
  createUser(req:Request,res:Response):Promise<Response>,
  toAccessUser(req:Request,res:Response):Promise<Response>,
  createAdminAccount(req:Request,res:Response):Promise<Response>
  getUser(id:string):Promise<IUserAttributes>
  // updateUserById(req:Request,res:Response):Promise<Response>,

}