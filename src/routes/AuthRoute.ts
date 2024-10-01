import { Router } from "express";
import { ControllerFactory } from "../factories/ControllerFactory";
import { verifyAdminKey } from "../middlewares/VerifyAdminKey";

const userController = ControllerFactory.MakeUserAuthController()

const router = Router()

router.post('/createaccount',userController.createUser.bind(userController))
router.post('/createadminaccount',verifyAdminKey,userController.createAdminAccount.bind(userController))
router.post('/signin',userController.toAccessUser.bind(userController))


export default router