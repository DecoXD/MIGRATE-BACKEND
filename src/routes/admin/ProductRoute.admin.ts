import { Router } from "express";
import { ControllerFactory } from "../../factories/ControllerFactory";
import { VerifyUserPermissions } from "../../middlewares/VerifyUserPermissions";
import { UtilitiesFactory } from "../../factories/UtilitiesFactory";
import { HttpException } from "../../exceptions/HttpException";
import { ErrorHandler } from "../../exceptions/ErrorHandler";

const ProductAdminRouter = Router()
const controller = ControllerFactory.MakeProductController()
const tokenManipulator = UtilitiesFactory.MakeTokenManipulator()

// only admin can be access this methods 
ProductAdminRouter.get('/',async(req,res,next) =>{
  const response = await controller.getAllProducts()
  if(response instanceof Error) {
    return next(response)
  }
  return res.status(200).json({response})
},ErrorHandler)


ProductAdminRouter.post('/create',VerifyUserPermissions,async (req,res,next) =>{
  const {name,price,description,stock,category,discount} = req.body;
    
  const productData = {
    name,
    price,
    description,
    stock,
    discount,
    category
  }

  const token = await tokenManipulator.getToken(req)
  const id = await tokenManipulator.getUserByToken(token)

  if(!id){
    const error = new HttpException('você nao possui permissão para realizar essa operação',403)
    return next(error)
  }

  const response = await controller.addProduct({product_owner:id,productData})

  if(response instanceof Error) {
    return next(response)
  }

  return res.status(201).json({response})

},ErrorHandler)


ProductAdminRouter.put('/update',VerifyUserPermissions,async (req,res,next) =>{

  const {id,name,description,discount,stock,category,price} = req.body
    const data = {
      id,
      name,
      discount,
      description,
      stock,
      category,
      price
    }

  const response = await  controller.updateProductData(data)
  if(response instanceof Error) return next(response)
  
  return res.status(201).json(response)

},ErrorHandler)


ProductAdminRouter.delete('/delete',VerifyUserPermissions,async (req,res,next) =>{
  const {id:productId} = req.body
  const token = await tokenManipulator.getToken(req)
  const {userId} = await tokenManipulator.getUserByToken(token)
  const response = await controller.deleteProduct(productId,userId)

  if(response instanceof Error) return next(response)
  
  return res.status(200).json(response)

},ErrorHandler)

export {ProductAdminRouter} 