import { Router } from "express";
import { ControllerFactory } from "../../factories/ControllerFactory";

import { VerifyUserPermissions } from "../../middlewares/VerifyUserPermissions";

const ProductRouter = Router()

const controller = ControllerFactory.MakeProductController()
// only admin can be access this methods 
ProductRouter.post('/create',VerifyUserPermissions,controller.addProduct.bind(controller))
ProductRouter.put('/update',VerifyUserPermissions,controller.updateProductData.bind(controller))
ProductRouter.delete('/delete',VerifyUserPermissions,controller.deleteProduct.bind(controller))
ProductRouter.get('/',VerifyUserPermissions,controller.getAllProducts.bind(controller))

export {ProductRouter}