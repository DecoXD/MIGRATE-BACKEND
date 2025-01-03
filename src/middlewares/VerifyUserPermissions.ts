import { NextFunction, Request, Response } from "express";
import { UtilitiesFactory } from "../factories/UtilitiesFactory";
import { RepositoryFactory } from "../factories/RepositoryFactory";

export async function VerifyUserPermissions(req:Request,res:Response,next:NextFunction){
  // buscar o usuário pelo token
  // verificar se ele tem acesso privilegiado
  // se for admin verificar a senha de acesso

  try {
    const token = req.headers.authorization
    const userId = await UtilitiesFactory.MakeTokenManipulator().getUserByToken(token)
    const user = await RepositoryFactory.MakeUserRepository().getUserById(userId)
    if(user.role !== "ADMIN") return res.status(401).json({message: 'STOP! Access Not Authorized'})
    next()
  } catch (error) {
    return res.status(500).json({message:error.message})
  }
 
}