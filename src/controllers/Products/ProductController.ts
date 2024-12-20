import { Request, Response } from "express";
import { IProductRepositoryProtocol } from "../../repositories/product/IProductRepository";
import { IProductControllerProtocol } from "./IProductController";
import { IProductServiceProtocol } from "@services/product/IProductServiceProtocol";
import { HttpException } from "../../exceptions/HttpException";
import { AddProductAttributes, AddProductResponseBody, ManegementProductResponse, ProductAttributes, UpdateProductAttributes } from "@interfaces/product";


export class ProductController implements IProductControllerProtocol{
  constructor(
 
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
      const response = await this.service.update(data) //acho melçhor a mensageria ficar por conta do controller
      return response
    } catch (error) {
      return error
      
    }
  }

  async getProductById(productId: number): Promise<ProductAttributes> {
    try {
      const response = await this.service.getProductById(productId)
      return response
    } catch (error) {
      
    }
  }

 
}