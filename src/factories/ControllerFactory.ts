import { TokenManipulator } from "../utilities/Token"
import { CreateUserService } from "../services/auth/UserAuthService" 
import { IProductControllerProtocol, 
  IUserAuthControllerProtocol, 
  ProductController, 
  UserController } from "../controllers"
import { IUserCartControllerProtocol } from "../controllers/cart/IUserCartControler"
import { UserCartController } from "../controllers/cart/UserCartController"
import { IOrderControllerProtocol } from "../controllers/Order/IOrderController"
import { OrderController } from "../controllers/Order/OrderController"
import { IProductCartControllerProtocol } from "../controllers/Product-cart/IProductCartController"
import { ProductCartController } from "../controllers/Product-cart/ProductCartController"
import { UserRepository } from "../repositories/auth/UserRepository"
import { ServicesFactory } from "./ServicesFactory"


export class ControllerFactory{

  static MakeUserAuthController():IUserAuthControllerProtocol{
    const userRepository = new UserRepository()
    const tokenManipulator = new TokenManipulator()
    const userVerificator = new CreateUserService(userRepository,tokenManipulator)
    const userController = new UserController(userRepository,userVerificator,tokenManipulator)
    
    return userController
  }

  static MakeProductController():IProductControllerProtocol{
    
    const service = ServicesFactory.MakeProductService()
    const controller = new ProductController(service)

  return controller
  }

  static MakeUserCartController():IUserCartControllerProtocol {
    const service = ServicesFactory.MakeUserCartService()
    return new UserCartController(service)
  }
  
  static MakeProductCartController():IProductCartControllerProtocol {
    const service = ServicesFactory.MakeProductCartService()

    return new ProductCartController(service)
}

  static MakeOrderController():IOrderControllerProtocol{
    const service = ServicesFactory.MakeOrderService()
    return new OrderController(service)

  }

}