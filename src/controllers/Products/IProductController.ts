import { AddProductAttributes, ProductAttributes } from "@interfaces/product"
import { Request, Response } from "express"


export type IProductControllerProtocol = {
  getAllProducts():Promise<ProductAttributes[]>
  getProductById(req:Request,res:Response):Promise<Response>
  addProduct(data:AddProductAttributes):Promise<ProductAttributes>
  updateProductData(req:Request,res:Response):Promise<Response>
  deleteProduct(req:Request,res:Response):Promise<Response>
  // updateProductQuanty(req:Request,res:Response):Promise<void> ta mais para o controlador do carrinho


}