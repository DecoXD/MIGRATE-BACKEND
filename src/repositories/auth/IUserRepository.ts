import { IUserAttributes, IUserRegisterAttributes } from "../../interfaces/auth"

export type IUserRepositoryProtocol = {
    registerUser(userData:IUserRegisterAttributes):Promise<IUserRegisterAttributes>;
    
    getUserById(id:string):Promise<IUserAttributes >;
    getUserByEmail(email:string):Promise<IUserRegisterAttributes | null>;
    getAllUsers():Promise<IUserRegisterAttributes[]|null>;
    updateUser(id:string,data:IUserRegisterAttributes):Promise<void>;
    unregisterUser(id:string):Promise<void>;
}


