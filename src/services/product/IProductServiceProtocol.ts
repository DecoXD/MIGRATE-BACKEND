
import { AddProductAttributes, AddProductResponseBody, DeleteProductResponseBody, ProductAttributes, UpdatedProductResponseBody, UpdateProductAttributes } from "@interfaces/product"; 

export type IProductServiceProtocol = {
  add({productData,product_owner}:AddProductAttributes):Promise<AddProductResponseBody>;
  update(product:UpdateProductAttributes):Promise<UpdatedProductResponseBody>;
  deleteById(productId:number,userId:string):Promise<DeleteProductResponseBody>
  getProductById(productId:number):Promise<ProductAttributes>
  getAll():Promise<ProductAttributes[]>
}