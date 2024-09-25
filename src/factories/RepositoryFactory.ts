import { IUserRepositoryProtocol } from "../repositories/auth/IUserRepository";
import { UserRepository } from "../repositories/auth/UserRepository";

export class RepositoryFactory{
  static createUserRepository():IUserRepositoryProtocol {
    return new UserRepository()
  }
}