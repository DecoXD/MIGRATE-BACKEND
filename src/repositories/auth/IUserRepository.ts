import { IUserAttributes } from "../../interfaces/auth"

export type IUserRepositoryProtocol = {
    registerUser(userData:IUserAttributes):Promise<IUserAttributes>;
    getUserById(id:string):Promise<IUserAttributes >;
    getUserByEmail(email:string):Promise<IUserAttributes | null>;
    getAllUsers():Promise<IUserAttributes[]|null>;
    updateUser(id:string,data:IUserAttributes):Promise<void>;
    unregisterUser(id:string):Promise<void>;
}


