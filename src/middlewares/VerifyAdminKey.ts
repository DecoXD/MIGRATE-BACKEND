import { NextFunction, Request, Response } from "express";

export function verifyAdminKey(req:Request,res:Response,next:NextFunction) {
  const {admin_key} = req.body;
  const key = process.env.ADMIN_CREATE_ACCOUNT_KEY
  console.log(key,admin_key)
  if(admin_key != key ) return res.status(401).json({message:'operação não permitida'})

  next()

}