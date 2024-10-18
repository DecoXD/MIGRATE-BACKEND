import { Request } from "express";
import { ProductAttributes } from "../../../interfaces/product";

export type IProductVerificatorProtocol = {
  addProductVerificator(product:ProductAttributes):Promise<boolean>;
  updateProductVerificator(product:ProductAttributes):Promise<void>;
  deleteProductVerificator(req:Request,product:ProductAttributes):Promise<void>
  verifyUserPermissions(userId:string):Promise<boolean>
}