/* eslint-disable */
import { UserRole } from "@prisma/client";
import { Request, Response } from "express";

export type IUserAttributes = {
  name:string,
  email:string,
  id?:string
  role?: UserRole
}

export type IUserRegisterAttributes = {
    name:string,
    email:string,
    password:string,
    id?:string
    role?:"ADMIN" | "USER"
}



export type IUserLoginAttributes = {
    email:string,
    password:string,
}



