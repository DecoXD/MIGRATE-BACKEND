import { Router } from "express";
import { ControllerFactory } from "../../factories/ControllerFactory";
import { ErrorHandler } from "../../exceptions/ErrorHandler";

const ProductRouter = Router()

const controller = ControllerFactory.MakeProductController()

ProductRouter.post('/create',controller.addProduct.bind(controller))
ProductRouter.put('/update',controller.updateProductData.bind(controller))
ProductRouter.delete('/delete',controller.deleteProduct.bind(controller))
ProductRouter.get('/',controller.getAllProducts.bind(controller))

export {ProductRouter}