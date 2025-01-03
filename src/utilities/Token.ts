import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken'
import { ITokenManipulator } from './interfaces';
import { HttpException } from '../exceptions/HttpException';


export class TokenManipulator implements ITokenManipulator{

  async getToken(req:Request){
    const authorization = req.headers.authorization
    
    if(!authorization){
      throw new Error('nao achamos o token')
    }
    const token = authorization.split(' ')[1]
    return token
  }

  async createToken(userId:string){
    try {
      const payload = {
       id: userId
      }
      const token = jwt.sign(
        payload,process.env.APP_JWT_SECRET,{
        expiresIn:"24h",
      })
      return token
    } catch (error) {
      throw new HttpException(error.message,409)
    }
  }

  async verifyToken(req:Request,res:Response,next:NextFunction){
    try {
      const token = await this.getToken(req)

      const decodedToken = jwt.decode(token)
      if(!decodedToken) throw new Error('erro no verify token')
      return true
    } catch (error) {
      console.log('erro na decodificação do token ')
    }
  }

  async getUserByToken(token:string):Promise<string>{
    try { 
      const splitedToken = this.splitToken(token)
      
      const decodedToken = jwt.decode(splitedToken,{json:true})
      
      if(!decodedToken) throw new HttpException('invalid token',501)
     
      return decodedToken.id
    } catch (error) {
      console.log('erro no getuserbytoken')
      throw error
      
    }
  }


  splitToken(token:String){
    const res = token.split(' ')
    return res.length > 1? res[1] : res[0]
  }

 
  
}
