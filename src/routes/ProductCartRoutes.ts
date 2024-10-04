import {Router} from 'express'
import { ControllerFactory } from '../factories/ControllerFactory'
import { verifyToken } from '../middlewares/VerifyToken'

const ProductCartRouter = Router()
const controller = ControllerFactory.MakeProductCartController()

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
})


ProductCartRouter.post('/add',verifyToken,async (req,res,next) =>{
  //only logged user can be add a product to your cart
  const {product_id,cart_id} = req.body
  
  const response = await controller.add({cart_id,product_id})

  if(response instanceof Error){
    return res.status(400).json({message:'algo errado aconteceu'})
  }
  return res.status(200).json({message:'ok',response})
})



export {ProductCartRouter}