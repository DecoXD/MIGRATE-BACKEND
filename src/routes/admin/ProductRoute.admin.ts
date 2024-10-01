import { Router } from "express";
import { ControllerFactory } from "../../factories/ControllerFactory";
import { VerifyUserPermissions } from "../../middlewares/VerifyUserPermissions";



const ProductAdminRouter = Router()

const controller = ControllerFactory.MakeProductController()
// only admin can be access this methods 
ProductAdminRouter.get('/',controller.getAllProducts.bind(controller))

ProductAdminRouter.post('/create',VerifyUserPermissions,controller.addProduct.bind(controller))
ProductAdminRouter.put('/update',VerifyUserPermissions,controller.updateProductData.bind(controller))
ProductAdminRouter.delete('/delete',VerifyUserPermissions,controller.deleteProduct.bind(controller))

export {ProductAdminRouter}