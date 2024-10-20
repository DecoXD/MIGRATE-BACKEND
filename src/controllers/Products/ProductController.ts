import { Request, Response } from "express";
import { IProductRepositoryProtocol } from "../../repositories/product/IProductRepository";
import { IProductControllerProtocol } from "./IProductController";
import { IProductVerificatorProtocol } from "../../utilities/verificators/product/IProductVerificatorProtocol";
import { HttpException } from "../../exceptions/HttpException";
import { AddProductAttributes, ProductAttributes } from "@interfaces/product";


export class ProductController implements IProductControllerProtocol{
  constructor(
    private repository:IProductRepositoryProtocol,
    private verificator:IProductVerificatorProtocol,
    ){
    
  }

  async getAllProducts():Promise<ProductAttributes[]>{
    try {
      const productList = await this.repository.getAll()
      return productList
    } catch (error) {
      return error
    }
    return  
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

  async addProduct({productData,product_owner}:AddProductAttributes): Promise<ProductAttributes> {

    try {
      await this.verificator.addProductVerificator(productData)//% esquisito
      Object.assign(productData,product_owner)

      const product = await this.repository.saveProduct(productData)
      
     
      return product
      
    } catch (error) {
      return error
    }

  
  }

  async deleteProduct(req: Request, res: Response): Promise<Response> {
    try {
      const {id} = req.body
   
      // await this.verificator.deleteProductVerificator(req,id)
      await this.repository.deleteProduct(id)
      return res.status(201).json({message:'produto deletado com sucesso'})
    } catch (error) {
      return res.status(500).json({message:error.message})
    }
  }

  async updateProductData(req: Request, res: Response): Promise<Response> {
    const {id,name,description,discount,stock,category,price} = req.body
    const data = {
      name,
      discount,
      description,
      stock,
      category,
      price
    }
    try {
      // await this.verificator.addProductVerificator(req,data)
      // await this.repository.updateProduct(id,data)
      return res.status(201).json({message:'item atualizado com sucesso'})
    } catch (error) {
      return res.status(500).json({message:error.message})
      
    }
  }

 
}