import { Router } from "express";
import { UtilitiesFactory } from "../factories/UtilitiesFactory";
import { ControllerFactory } from "../factories/ControllerFactory";
import { ErrorHandler } from "../exceptions/ErrorHandler";

const controller = ControllerFactory.MakeUserCartController()
const router = Router()
//verify token in ever request

router.post('/create',async (req,res,next) =>{
  //get user id by token
  const token = req.headers.authorization
  const userId = await UtilitiesFactory.MakeTokenManipulator().getUserByToken(token)
  const response = await controller.createCart({userId})
  if(response instanceof Error){
    return next(response)
  }
  return res.status(201).json({message:"carrinho criado com sucesso"})
  //get product id 
}, ErrorHandler)

// to close the cart must be authenticated to cancell the cart
router.patch('/close',(req,res) =>{
 
})



export {router}