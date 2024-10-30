import { HttpException } from "./HttpException";

export function ErrorHandler (err,req,res,next){
  if(err instanceof HttpException){
    return res.status(err.statusCode).json({message:err.message,statusCode:err.statusCode})
  } else if( err instanceof Error){
    //evitar mandar a mensagem de erros sistemicos, em vez disso registrar em logs e mandar mensagens genericas aos clientes
    return res.status(500).json({message:"System Error try again latter " })
  } else{
    return res.status(500).json({message:"An unexpected Error occurred " })
  }
  

}