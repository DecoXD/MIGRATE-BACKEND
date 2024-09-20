import { Request, Response } from "express";
import { IProductRepositoryProtocol } from "../../repositories/product/IProductRepository";
import { IProductControllerProtocol } from "./IProductController";
import { IProductVerificatorProtocol } from "../../utilities/verificators/product/IProductVerificatorProtocol";
import { HttpException } from "../../exceptions/HttpException";


export class ProductController implements IProductControllerProtocol{
  constructor(
    private repository:IProductRepositoryProtocol,
    private verificator:IProductVerificatorProtocol,
    ){
    
  }

  async getAllProducts(req: Request, res: Response):Promise<Response>{
    try {
      const productList = await this.repository.getAll()
      return res.status(201).json({productList})
    } catch (error) {
      res.status(500).json({message:error.message})
    }
    return  
  }

  async getProductById(req: Request, res: Response): Promise<Response> {
    const {id} = req.body
    try {
      const product = await this.repository.getProductById(id) 
      res.status(201).json({product})
    } catch (error) {
      if(error instanceof HttpException){
       return res.status(error.statusCode).json({message:error.message})
      }
      return res.status(501).json({message:'systemError'})
    }
    return 
  }

  async addProduct(req: Request, res: Response): Promise<Response> {
   
    const {name,price,discription,stock,category,discount} = req.body;
    //
    const productData = {
      name,
      price,
      discription,
      stock,
      discount,
      category
    }

    try {
      const userId = await this.verificator.addProductVerificator(req,productData)
      Object.assign(productData,{userId})

      const product = await this.repository.saveProduct(productData)
      
     
      return res.status(200).json({message:'produto cadastrado com sucesso !',product})
      
    } catch (error) {
      return res.status(500).json({message:error.message})
    }

  
  }

  async deleteProduct(req: Request, res: Response): Promise<Response> {
    try {
      const {id} = req.body
      await this.repository.deleteProduct(id)
      return res.status(201).json({message:'produto deletado com sucesso'})
    } catch (error) {
      return res.status(500).json({message:error.message})
    }
  }

  async updateProductData(req: Request, res: Response): Promise<Response> {
    const data = req.body
    const {id} = req.params
    try {
      await this.repository.updateProduct(id,data)
      return res.status(201).json({message:'item atualizado com sucesso'})
    } catch (error) {
      return res.status(500).json(error.message)
      
    }
  }

 
}