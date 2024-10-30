import { TokenManipulator } from "../utilities/Token"
import { CreateUserService } from "../services/auth/UserAuthService" 
import { UserCartService } from "../services/cart/CartService"
import { OrderVerificator } from "../services/order/OrderVerificator"
import { ProductService } from "../services/product/ProductService.ts"
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
import { OrderRepository } from "../repositories/order/OrderRepository"
import { ProductCartRepository } from "../repositories/product-cart/ProductCartRepository"
import { ProductRepository } from "../repositories/product/ProductRepository"
import { UserCartRepository } from "../repositories/user-cart/UserCartRepository"
import { UtilitiesFactory } from "./UtilitiesFactory"


export class ControllerFactory{

  static MakeUserAuthController():IUserAuthControllerProtocol{
    const userRepository = new UserRepository()
    const tokenManipulator = new TokenManipulator()
    const userVerificator = new CreateUserService(userRepository,tokenManipulator)
    const userController = new UserController(userRepository,userVerificator,tokenManipulator)
    
    return userController
  }

  static MakeProductController():IProductControllerProtocol{
    const repository = new ProductRepository()
    const userService = new UserRepository()
    const tokenManipulator =  new TokenManipulator()
    const service = new ProductService(repository,userService,tokenManipulator)
    const controller = new ProductController(repository,service)

  return controller
  }

  static MakeUserCartController():IUserCartControllerProtocol {
    const repository = new UserCartRepository()
    const verificator = new UserCartService(repository)
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

  static MakeOrderController():IOrderControllerProtocol{
    const cartRepository = new UserCartRepository()
    const productCartRepository = new ProductCartRepository()
    const orderRepository  = new OrderRepository()
    const verificator = new OrderVerificator(cartRepository)
    return new OrderController(productCartRepository,cartRepository,orderRepository,verificator)

  }

}