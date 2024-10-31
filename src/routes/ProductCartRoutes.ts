import {Router} from 'express'
import { ControllerFactory } from '../factories/ControllerFactory'
import { verifyToken } from '../middlewares/VerifyToken'
import { UtilitiesFactory } from '../factories/UtilitiesFactory'
import { ErrorHandler } from '../exceptions/ErrorHandler'

const ProductCartRouter = Router()
const controller = ControllerFactory.MakeProductCartController()
const tokenManipulator = UtilitiesFactory.MakeTokenManipulator()
ProductCartRouter.get('/:id',verifyToken,async (req,res,next) =>{
  const {id} = req.params
  const cart_id = Number(id)

  // only active cart has valid to get data and
  // only cart owner can be access the cart
  const response = await controller.getAll(cart_id)
 
  if(response instanceof Error){
    
    return res.status(400).json({message:'algo errado aconteceu'})
  }
  return res.status(200).json({message:'ok',response})
},ErrorHandler)


ProductCartRouter.post('/add',verifyToken,async (req,res,next) =>{
  //only logged user can be add a product to your cart
  const {product_id,cart_id,price} = req.body
  
  const response = await controller.add({cart_id,product_id,price})

  if(response instanceof Error){
    return res.status(400).json({message:'algo errado aconteceu'})
  }
  return res.status(200).json({message:'ok',response})
},ErrorHandler)

ProductCartRouter.delete('/delete',async (req,res,next) =>{
  try {
  const {cart_id,product_id} = req.body;
  const token = await tokenManipulator.getToken(req)
  const user_id = await tokenManipulator.getUserByToken(token)
  const response = await controller.delete(user_id,product_id,cart_id)
  
  if(response instanceof Error) {
    return next(response)
  }

  return res.status(200).json({message:"produto deletado com sucesso"})
  
  } catch (error) {
    next(error)
  }
},ErrorHandler)

export {ProductCartRouter}