import { Router } from "express";
import { ControllerFactory } from "../../factories/ControllerFactory";

import { VerifyUserPermissions } from "../../middlewares/VerifyUserPermissions";

const ProductAdminRouter = Router()

const controller = ControllerFactory.MakeProductController()
// only admin can be access this methods 
ProductAdminRouter.get('/',controller.getAllProducts.bind(controller))
ProductAdminRouter.post('/create',controller.addProduct.bind(controller))
ProductAdminRouter.put('/update',controller.updateProductData.bind(controller))
ProductAdminRouter.delete('/delete',controller.deleteProduct.bind(controller))

export {ProductAdminRouter}