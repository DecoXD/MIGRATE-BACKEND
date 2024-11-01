/* eslint-disable */
import { UserRole } from "@prisma/client";


export type IUserAttributes = {
  name:string,
  email:string,
  id?:string
  role?: UserRole
  password?: string
}

export type ICreateUserResponse = {
  newUser:IUserAttributes,
  token:string
}

export type IUserRegisterAttributes = {
    name:string,
    email:string,
    password:string,  
}

export type IAdminRegisterAttributes = {
  name:string,
  email:string,
  password:string,
  role:UserRole
}

export type IUserLoginAttributes = {
    email:string,
    password:string,
}


//responses 
export type IUserLoginResponse = {
  token:string,
  message:string
}

export type IRegisterResponseBody = {
  message:string,
  token:string
}

