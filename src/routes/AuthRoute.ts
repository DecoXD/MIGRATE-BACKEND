import { Router } from "express";
import { ControllerFactory } from "../factories/ControllerFactory";
import { verifyAdminKey } from "../middlewares/VerifyAdminKey";
import { verifyToken } from "../middlewares/VerifyToken";
import { UtilitiesFactory } from "../factories/UtilitiesFactory";

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
})
router.post('/createaccount',userController.createUser.bind(userController))
router.post('/createadminaccount',verifyAdminKey,userController.createAdminAccount.bind(userController))
router.post('/signin',userController.toAccessUser.bind(userController))


export default router