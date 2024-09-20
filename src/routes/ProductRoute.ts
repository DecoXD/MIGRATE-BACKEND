import { Router } from "express";
import { ControllerFactory } from "../factories/ControllerFactory";

const ProductRouter = Router()

const controller = ControllerFactory.MakeProductController()

ProductRouter.post('/create',controller.addProduct.bind(controller))
ProductRouter.get('/',controller.getAllProducts.bind(controller))

export {ProductRouter}