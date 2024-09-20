import { Router } from "express";
import { ControllerFactory } from "../factories/ControllerFactory";

const userController = ControllerFactory.MakeUserAuthController()

const router = Router()

router.post('/createaccount',userController.createUser.bind(userController))
router.post('/signin',userController.toAccessUser.bind(userController))


export default router