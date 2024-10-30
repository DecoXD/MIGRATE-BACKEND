import { Request, Response } from "express";
import { IProductRepositoryProtocol } from "../../repositories/product/IProductRepository";
import { IProductControllerProtocol } from "./IProductController";
import { IProductServiceProtocol } from "@services/product/IProductServiceProtocol";
import { HttpException } from "../../exceptions/HttpException";
import { AddProductAttributes, AddProductResponseBody, ManegementProductResponse, ProductAttributes, UpdateProductAttributes } from "@interfaces/product";


export class ProductController implements IProductControllerProtocol{
  constructor(
    private repository:IProductRepositoryProtocol,
    private service:IProductServiceProtocol,
    ){
    
  }

  async getAllProducts():Promise<ProductAttributes[]>{
    try {
      const productList = await this.service.getAll()
      return productList
    } catch (error) {
      return error
    }
    
  }

  async getProductById(req: Request, res: Response): Promise<Response> {
    const {id} = req.body
    try {
      const product = await this.repository.getProductById(id) 
      return res.status(201).json({product})
    } catch (error) {
      if(error instanceof HttpException){
       return res.status(error.statusCode).json({message:error.message})
      }
      return res.status(501).json({message:'systemError'})
    }
  
  }

  async addProduct({productData,product_owner}:AddProductAttributes): Promise<AddProductResponseBody > {
    try {
      const {message,product} = await this.service.add({productData,product_owner})//% esquisito
 
      return {message,product}
      
    } catch (error) {
      return error
    }

  
  }

  async deleteProduct(productId:number,userId:string): Promise<ManegementProductResponse> {
    try {
      
   
      // await this.service.deleteProductservice(req,id)
      await this.service.deleteById(productId,userId)
      return {message:'produto deletado com sucesso'}
    } catch (error) {
      return error
    }
  }

  async updateProductData(data:UpdateProductAttributes) {
    
    try {
      const {message,product} = await this.service.update(data) //acho melçhor a mensageria ficar por conta do controller
      
      return {message,product}
    } catch (error) {
      return error
      
    }
  }

 
}