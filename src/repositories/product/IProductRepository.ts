import { ProductAttributes } from "../../interfaces/product"

export type IProductRepositoryProtocol = {
  getAll()
  getAllProductsByCategory(category:string,order?:string):Promise<ProductAttributes[]>
  getProductById(productId:string):Promise<ProductAttributes>
  saveProduct(product:ProductAttributes):Promise<ProductAttributes>
  deleteProduct(id:string):Promise<void>
  updateProduct(id:string,data:ProductAttributes):Promise<void>  
}