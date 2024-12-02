import { NextFunction, Request, Response } from "express"

// import jwt from "jsonwebtoken"
import { UtilitiesFactory } from "../factories/UtilitiesFactory"
const tokenManager = UtilitiesFactory.MakeTokenManipulator()
export async function verifyToken(req:Request,res:Response,next:NextFunction){
  try {
    
    const token = await tokenManager.getToken(req)
    const decodedToken = await tokenManager.getUserByToken(token)
    
    if(!decodedToken) return res.status(401).json({message:'token invalido'})
    next()
  } catch (error) {
    console.log(error.message)
    return res.status(401).json({message:'não foi possivel realizar esta operação'})
  }
}





// VERIFICAÇÃO DE TOKEN BACKEND 
//   export async function verifyToken(req:Request,res:Response,next:NextFunction){
//   try {
    
//     const token = req.cookies.token;

//     if(!token) res.status(401).json({message:"ACESSO NÃO AUTORIZADO"})  
//     const decodedToken = await tokenManager.getUserByToken(token)
//     if(!decodedToken) return res.status(403).json({message:'ACESSO PROIBIDO'})
//     next()
//   } catch (error) {
//     console.log(error.message)
//     return res.status(401).json({message:'não foi possivel realizar esta operação'})
//   }
// }


