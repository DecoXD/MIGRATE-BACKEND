import { ProductAttributes } from "../../interfaces/product"

export type IProductRepositoryProtocol = {
  getAll()
  getAllProductsByCategory(category:string,order?:string):Promise<ProductAttributes[]>
  getProductById(productId:number):Promise<ProductAttributes>
  saveProduct(product:ProductAttributes):Promise<ProductAttributes>
  deleteProduct(id:number):Promise<void>
  updateProduct(id:number,data:ProductAttributes):Promise<void>  
}