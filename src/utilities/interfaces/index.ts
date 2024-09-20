import { Request } from "express"

export type ITokenManipulator = {
  createToken(id:string):Promise<string | void>
  verifyToken(req:Request):Promise<boolean|void>
  getToken(req:Request):Promise<string>
  getUserByToken(token:string)
}