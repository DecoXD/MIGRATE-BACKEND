/* eslint-disable */
import { Request, Response } from "express";

export type IUserAttributes = {
    name:string,
    email:string,
    password:string,
    id?:string
    role?:string
}
export type IUserLoginAttributes = {
    email:string,
    password:string,
}



