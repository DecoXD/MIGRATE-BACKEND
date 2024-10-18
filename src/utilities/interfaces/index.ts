import { NextFunction, Request, Response } from "express"

export type ITokenManipulator = {
  createToken(id:string):Promise<string >
  verifyToken(req:Request,res:Response,next:NextFunction):Promise<boolean|void>
  getToken(req:Request):Promise<string>
  getUserByToken(token:string)
}