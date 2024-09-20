import { Request, Response } from "express"


export type IProductControllerProtocol = {
  getAllProducts(req: Request, res: Response):Promise<Response>
  getProductById(req:Request,res:Response):Promise<Response>
  addProduct(req:Request,res:Response):Promise<Response>
  updateProductData(req:Request,res:Response):Promise<Response>
  deleteProduct(req:Request,res:Response):Promise<Response>
  // updateProductQuanty(req:Request,res:Response):Promise<void> ta mais para o controlador do carrinho


}