import { Request } from "express";
import { ProductAttributes } from "../../../interfaces/product";

export type IProductVerificatorProtocol = {
  addProductVerificator(req:Request,product:ProductAttributes):Promise<string>;
  updateProductVerificator(product:ProductAttributes):Promise<void>;
  deleteProductVerificator(product:ProductAttributes):Promise<void>
}