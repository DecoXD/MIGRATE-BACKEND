import { IProductControllerProtocol, IUserAuthControllerProtocol, ProductController, UserController } from "../controllers"
import { IUserCartControllerProtocol } from "../controllers/cart/IUserCartControler"
import { UserCartController } from "../controllers/cart/UserCartController"
import { UserRepository } from "../repositories/auth/UserRepository"
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
  static MakeShoppingCartController():IUserCartControllerProtocol {
    const repository = new UserCartRepository()
    const verificator = new UserCartVerificator(repository)
    const tokenManipulator = UtilitiesFactory.MakeTokenManipulator()

    return new UserCartController(repository,verificator,tokenManipulator)
  }
}