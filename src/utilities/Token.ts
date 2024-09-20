import { Request } from 'express';
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
        userId,
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

  async verifyToken(req:Request){
    try {
      const token = await this.getToken(req)
      const decodedToken = jwt.decode(token)
      return true
    } catch (error) {
      console.log('erro na decodificação do token ')
    }
  }

  async getUserByToken(token:string){
    try { 
      const decodedToken = jwt.decode(token)
     
      return decodedToken
    } catch (error) {
      console.log('erro no getuserbytoken')
      
    }
  }

  
}
