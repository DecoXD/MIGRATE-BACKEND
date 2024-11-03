import { Router } from "express";
import { ControllerFactory } from "../factories/ControllerFactory";
import { UtilitiesFactory } from "../factories/UtilitiesFactory";
import { HttpException } from "../exceptions/HttpException";
import { ErrorHandler } from "../exceptions/ErrorHandler";

const ProductRouter = Router()
const controller = ControllerFactory.MakeProductController()
const tokenManipulator = UtilitiesFactory.MakeTokenManipulator()

ProductRouter.get('/',async(req,res,next) =>{
  const response = await controller.getAllProducts()
  if(response instanceof Error) {
    return next(response)
  }
  return res.status(200).json({response})
},ErrorHandler)

ProductRouter.get('/:id',async (req,res,next) =>{
  const {id} = req.params
  const productId = Number(id)
  if(isNaN(productId)){
    let error = new HttpException('Conteúdo não encontrado',404)
    next(error)
  }
  const response = await controller.getProductById(productId)
  
  if(response instanceof Error) return next(response)

  return res.status(200).json(response)
  
},ErrorHandler)



export {ProductRouter}