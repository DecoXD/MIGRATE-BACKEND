import { Request, Response } from "express";

export type IUserAuthControllerProtocol = {
  createUser(req:Request,res:Response):Promise<Response>,
  toAccessUser(req:Request,res:Response):Promise<Response>,
  // updateUserById(req:Request,res:Response):Promise<Response>,

}