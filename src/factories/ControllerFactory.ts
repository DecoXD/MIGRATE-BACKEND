import { IProductControllerProtocol, IUserAuthControllerProtocol, ProductController, UserController } from "../controllers"
import { IUserCartControllerProtocol } from "../controllers/cart/IUserCartControler"
import { UserCartController } from "../controllers/cart/UserCartController"
import { IProductCartControllerProtocol } from "../controllers/Product-cart/IProductCartController"
import { ProductCartController } from "../controllers/Product-cart/ProductCartController"
import { UserRepository } from "../repositories/auth/UserRepository"
import { OrderRepository } from "../repositories/order/OrderRepository"
import { ProductCartRepository } from "../repositories/product-cart/ProductCartRepository"
import { ProductRepository } from "../repositories/product/ProductRepository"
import { UserCartRepository } from "../repositories/user-cart/UserCartRepository"
import { TokenManipulator } from "../utilities/Token"
import { CreateUserVerificator } from "../utilities/verificators/auth/UserAuthVerificator"
import { UserCartVerificator } from "../utilities/verificators/cart/CartVerificator"
import { ProductVerificator } from "../utilities/verificators/product/ProductVerificator.ts"
import { UtilitiesFactory } from "./UtilitiesFactory"


export class ControllerFactory{

  static MakeUserAuthController():IUserAuthControllerProtocol{
    const userService = new UserRepository()
    const userVerificator = new CreateUserVerificator(userService)
    const tokenManipulator = new TokenManipulator()
    const userController = new UserController(userService,userVerificator,tokenManipulator)
    
    return userController
  }

  static MakeProductController():IProductControllerProtocol{
    const service = new ProductRepository()
    const userService = new UserRepository()
    const tokenManipulator =  new TokenManipulator()
    const verificator = new ProductVerificator(service,userService,tokenManipulator)
    const controller = new ProductController(service,verificator)

  return controller
  }

  static MakeUserCartController():IUserCartControllerProtocol {
    const repository = new UserCartRepository()
    const verificator = new UserCartVerificator(repository)
    const tokenManipulator = UtilitiesFactory.MakeTokenManipulator()

    return new UserCartController(repository,verificator,tokenManipulator)
  }
  
  static MakeProductCartController():IProductCartControllerProtocol {
    const userCartController = new UserCartRepository()
    const productController = new ProductRepository
    const orderRepository = new OrderRepository()
    const repository = new ProductCartRepository()

    return new ProductCartController(userCartController,productController,orderRepository,repository)
}


}