import { AddProductAttributes, AddProductResponseBody, ManegementProductResponse, ProductAttributes, UpdateProductAttributes } from "@interfaces/product"
import { Request, Response } from "express"


export type IProductControllerProtocol = {
  getAllProducts():Promise<ProductAttributes[]>
  getProductById(req:Request,res:Response):Promise<Response>
  addProduct(data:AddProductAttributes):Promise<AddProductResponseBody>
  updateProductData(data:UpdateProductAttributes)
  deleteProduct(productId:number,userId:string):Promise<ManegementProductResponse>
  // updateProductQuanty(req:Request,res:Response):Promise<void> ta mais para o controlador do carrinho


}