import { IProductControllerProtocol, IUserAuthControllerProtocol, ProductController, UserController } from "../controllers"
import { UserRepository } from "../repositories/auth/UserRepository"
import { ProductRepository } from "../repositories/product/ProductRepository"
import { TokenManipulator } from "../utilities/Token"
import { CreateUserVerificator } from "../utilities/verificators/auth/UserAuthVerificator"
import { ProductVerificator } from "../utilities/verificators/product/ProductVerificator.ts"


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

}