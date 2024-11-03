import { TokenManipulator } from "../utilities/Token"
import { CreateUserService } from "../services/auth/UserAuthService" 
import { UserCartService } from "../services/cart/CartService"
import { OrderService } from "../services/order/OrderService"
import { ProductService } from "../services/product/ProductService"
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

import { ProductCartService } from "../services/product-cart/ProductCartService"


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
    const controller = new ProductController(service)

  return controller
  }

  static MakeUserCartController():IUserCartControllerProtocol {
    const repository = new UserCartRepository()
    const service = new UserCartService(repository)
    return new UserCartController(service)
  }
  
  static MakeProductCartController():IProductCartControllerProtocol {
    const productRepository = new ProductRepository
    const repository = new ProductCartRepository()
    const userRepository = new UserRepository()
    const tokenManipulator = new TokenManipulator
    const userService = new CreateUserService(userRepository,tokenManipulator)
    const service = new ProductCartService(productRepository,repository,userService)

    return new ProductCartController(service)
}

  static MakeOrderController():IOrderControllerProtocol{
    const cartRepository = new UserCartRepository()
    const productCartRepository = new ProductCartRepository()
    const orderRepository  = new OrderRepository()
    const service = new OrderService(productCartRepository,cartRepository,orderRepository)
    return new OrderController(service)

  }

}