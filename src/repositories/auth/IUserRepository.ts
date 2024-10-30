import { IAdminRegisterAttributes, IUserAttributes, IUserRegisterAttributes } from "../../interfaces/auth"

export type IUserRepositoryProtocol = {
    registerUser(userData:IUserRegisterAttributes):Promise<IUserAttributes>;
    registerAdmin(adminData:IAdminRegisterAttributes):Promise<IUserAttributes>
    getUserById(id:string):Promise<IUserAttributes >;
    getUserByEmail(email:string):Promise<IUserAttributes | null>;
    getAllUsers():Promise<IUserRegisterAttributes[]|null>;
    updateUser(id:string,data:IUserRegisterAttributes):Promise<void>;
    unregisterUser(id:string):Promise<void>;
}


