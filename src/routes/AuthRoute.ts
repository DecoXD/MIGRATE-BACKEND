import { NextFunction, Request, Response, Router } from "express";
import { ControllerFactory } from "../factories/ControllerFactory";
import { verifyAdminKey } from "../middlewares/VerifyAdminKey";
import { verifyToken } from "../middlewares/VerifyToken";
import { UtilitiesFactory } from "../factories/UtilitiesFactory";
import { ErrorHandler } from "../exceptions/ErrorHandler";
import { UserRole } from "@prisma/client";

const userController = ControllerFactory.MakeUserAuthController()
const router = Router()

router.get('/getuser',verifyToken,async (req,res) =>{
  const tokenManager = UtilitiesFactory.MakeTokenManipulator()
  const token = await tokenManager.getToken(req)
  const id = await tokenManager.getUserByToken(token)
  if(!id) return res.status(404).json({message:"user not found"})
  const response = await userController.getUser(id)

  if(response instanceof Error){
    return res.status(500).json({message:"erro no get user"})
  }

  return res.status(200).json({message:"usuário encontrado !",user:response})
},ErrorHandler)

router.post('/createaccount',async (req:Request,res:Response,next:NextFunction) => {
  const {name,email,password} = req.body
    const data = {
      name,
      email,
      password, 
    }
  const response = await userController.createUser(data)

  if(response instanceof Error){
    return next(response)
  }
  return res.status(201).json(response)

},ErrorHandler)

router.post('/createadminaccount',verifyAdminKey,async (req:Request,res:Response,next:NextFunction) =>{
  const {name,email,password} = req.body
  const data = {
    name,
    email,
    password, 
    role:UserRole.ADMIN
  }
  const response = await userController.createAdminAccount(data)
  
  if(response instanceof Error){
    return next(response)
  }
  return res.status(201).json(response)

},ErrorHandler)

router.post('/signin',async (req:Request,res:Response,next:NextFunction) =>{
  const {email,password} = req.body
  const data = {
    email,
    password
  }
  const response = await userController.toAccessUser(data)
  if(response instanceof Error){
    return next(response)
  }
  res.status(200).json(response)

},ErrorHandler)


export default router