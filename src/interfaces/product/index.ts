export type ProductAttributes = {
  name:string;
  description:string;
  price:number;
  discount:number;
  stock?:number;
  category:string;

}

export type AddProductAttributes = {
  productData:ProductAttributes,
  product_owner:string
}