import { OrderService } from "@services/order/OrderService";
import { ProductService } from "@services/product/ProductService";
import { IProductCartServiceProtocol } from "@services/product-cart/IProductCartService";
import { CreateUserService } from "@services/auth/UserAuthService";
import { ICartServiceProtocol } from "@services/cart/ICartService";
import { ProductCartService } from "@services/product-cart/ProductCartService";
import { IOrderService } from "@services/order/IOrderService";
import { UserCartService } from "@services/cart/CartService";
import { ICreateUserService } from "@services/auth/IUserAuthService";
import { RepositoryFactory } from "./RepositoryFactory";
import { UtilitiesFactory } from "./UtilitiesFactory";
import { IProductServiceProtocol } from "@services/product/IProductServiceProtocol";


export class ServicesFactory { 


  static MakeUserService():ICreateUserService{
    const tokenManipulator = UtilitiesFactory.MakeTokenManipulator()
    const userRepository = RepositoryFactory.MakeUserRepository()
    return new CreateUserService(userRepository,tokenManipulator)
  }

  static MakeProductService():IProductServiceProtocol{
    const userService = ServicesFactory.MakeUserService()
    const repository = RepositoryFactory.MakeProductRepository()
    return new ProductService(repository,userService)
  }

  static MakeUserCartService():ICartServiceProtocol{
    const repository = RepositoryFactory.MakeUserCartRepository()
    return new UserCartService(repository)
  }

  static MakeProductCartService():IProductCartServiceProtocol{
    const productRepository = RepositoryFactory.MakeProductRepository()
    const repository = RepositoryFactory.MakeProductCartRepository()
    const userService = ServicesFactory.MakeUserService()
    return new ProductCartService(productRepository,repository,userService)
  }

  static MakeOrderService():IOrderService{
    const productCartRepository = RepositoryFactory.MakeProductCartRepository()
    const userCartRepository = RepositoryFactory.MakeUserCartRepository()
    const repository = RepositoryFactory.MakeOrderRepository()
    return new OrderService(productCartRepository,userCartRepository,repository)
  }

}