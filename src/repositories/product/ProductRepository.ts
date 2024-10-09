import { prismaClient } from "../../config/dbConfig";
import { HttpException } from "../../exceptions/HttpException";
import { ProductAttributes } from "../../interfaces/product";
import { IProductRepositoryProtocol } from "./IProductRepository";

export class ProductRepository implements IProductRepositoryProtocol{
  
  async deleteProduct(id: number): Promise<void> {
    try {
      await prismaClient.product.delete({
        where:{
          id:id
        }
      })
    } catch (error) {
      throw new HttpException(`system error ${error.message}`,501)
    }
  }

  async getAll(){
    
    try {
      const products = await prismaClient.product.findMany()
      if(!products) new HttpException("nenhum produto encontrado",404)
      return products
    } catch (error) {
      if(error instanceof HttpException){
        throw new HttpException(error.message,error.statusCode)
      }
      throw new HttpException('Server Error',500)
    }
  }

  async getAllProductsByCategory(category: string, order?: string): Promise<ProductAttributes[]> {
    try {
      const product = await prismaClient.product.findMany({
        where:{
          category
        }
      })
      if(!product) throw new HttpException('Not Found',404)
      return product
    } catch (error) {
      if(error instanceof HttpException){
        throw new HttpException(error.message,error.statusCode)
      } 
      throw new HttpException('System Error',501)
    }
  }

  async getProductById(productId: number): Promise<ProductAttributes> {
    try {
      const product = await prismaClient.product.findUnique({
        where:{
          id:productId
        }
      })
      if(!product) throw new HttpException('Not Found',404)
      return product
    } catch (error) {
      if(error instanceof HttpException){
        throw new HttpException(error.message,error.statusCode)
      } 
      throw new HttpException('System Error',501)
    }
  }

  async saveProduct(product): Promise<ProductAttributes> {
    try {
      const newProduct = await prismaClient.product.create({
        data:product
      })
      if(!newProduct) throw new HttpException('Erro ao cadastrar produto',409)
      return newProduct
    } catch (error) {
      console.log(error.message)
    }
  }

  async updateProduct(id: number,data:ProductAttributes): Promise<void> {
    try {
      const product = await prismaClient.product.update({
        data:data,
        where:{
          id:id
        }
      })
      if(!product) throw new HttpException('Erro ao atualizar o produto',404)
    } catch (error) {
      if(error instanceof HttpException){
        throw new HttpException(error.message,error.statusCode)
      } throw new HttpException('ocurred a system error when your product are been updated',501)
    }
  }

  async getPriceById(id: number): Promise<number> {
    try {
      const productPrice = await prismaClient.product.findUnique({where:{
        id
      },select:{
        price:true
      }})
      return productPrice.price
    } catch (error) {
      return error
    }
  }
}