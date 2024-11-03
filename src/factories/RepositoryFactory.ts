import { IUserRepositoryProtocol } from "../repositories/auth/IUserRepository";
import { UserRepository } from "../repositories/auth/UserRepository";
import { IOrderRepositoryProtocol } from "../repositories/order/IOrderRepository";
import { OrderRepository } from "../repositories/order/OrderRepository";
import { IProductCartRepositoryProtocol } from "../repositories/product-cart/IProductCartRepository";
import { ProductCartRepository } from "../repositories/product-cart/ProductCartRepository";
import { IProductRepositoryProtocol } from "../repositories/product/IProductRepository";
import { ProductRepository } from "../repositories/product/ProductRepository";
import { IUserCartRepositoryProtocol } from "../repositories/user-cart/IUserCartRepository";
import { UserCartRepository } from "../repositories/user-cart/UserCartRepository";

export class RepositoryFactory{


  static MakeUserRepository():IUserRepositoryProtocol {
    return new UserRepository()

  }

  static MakeProductRepository():IProductRepositoryProtocol{
    return new ProductRepository()
  }

  static MakeUserCartRepository():IUserCartRepositoryProtocol{
    return new UserCartRepository()
  }

  static MakeProductCartRepository():IProductCartRepositoryProtocol{
    return new ProductCartRepository()
  }
  
  static MakeOrderRepository():IOrderRepositoryProtocol{
    return new OrderRepository()
  }
}