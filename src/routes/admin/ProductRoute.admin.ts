import { Router } from "express";
import { ControllerFactory } from "../../factories/ControllerFactory";
import { VerifyUserPermissions } from "../../middlewares/VerifyUserPermissions";
import { UtilitiesFactory } from "../../factories/UtilitiesFactory";
import { HttpException } from "../../exceptions/HttpException";



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
})

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

  controller.addProduct({product_owner:id,productData})
})
ProductAdminRouter.put('/update',VerifyUserPermissions,controller.updateProductData.bind(controller))
ProductAdminRouter.delete('/delete',VerifyUserPermissions,controller.deleteProduct.bind(controller))

export {ProductAdminRouter} 