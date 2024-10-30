export type ProductAttributes = {
  name:string;
  description:string;
  price:number;
  discount:number;
  stock?:number;
  category:string;
  id?: number

}

export type UpdateProductAttributes = ProductAttributes & {id: number}



export type AddProductAttributes = {
  productData:ProductAttributes,
  product_owner:string
}

export type ManegementProductResponse = {
  message:string
}

export type AddProductResponseBody = {
  message:string,
  product :ProductAttributes | null
}

export type UpdatedProductResponseBody = {
  message:string,
  product :ProductAttributes | null
}

export type DeleteProductResponseBody = {
  message:string
}