import { Router } from "express";
import { UtilitiesFactory } from "../factories/UtilitiesFactory";
import { ControllerFactory } from "../factories/ControllerFactory";
import { ErrorHandler } from "../exceptions/ErrorHandler";

const controller = ControllerFactory.MakeUserCartController()
const router = Router()
//verify token in ever request

router.get('/',async (req,res) =>{
  //fechar carrinho e emitir ordem 
  try {
    const tokenManager = UtilitiesFactory.MakeTokenManipulator()
    const token = await tokenManager.getToken(req)
    const user_id = await tokenManager.getUserByToken(token)
  
  const response = await controller.getAllUserCart(user_id)

  if(response instanceof Error){
    return res.status(500).json({message:'erro no get allusercarts mid'})

  }
  return res.status(200).json({message:"ola mundo",cartList:response})
  } catch (error) {
    return res.status(500).json({message:'erro no get allusercarts mid'})
  }
  
 })

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




export {router}