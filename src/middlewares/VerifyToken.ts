import { NextFunction, Request, Response } from "express"

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