import { Router } from "express";
import { verifyToken } from "../middlewares/VerifyToken";
import { UtilitiesFactory } from "../factories/UtilitiesFactory";
import { ControllerFactory } from "../factories/ControllerFactory";

const orderRouter = Router()
const controller = ControllerFactory.MakeOrderController()


orderRouter.get('/getall',async (req,res) =>{
  const user_id = await UtilitiesFactory.MakeTokenManipulator().getUserByToken(req.headers.authorization);
  
  const response = await controller.getByUserId(user_id)

  if(response instanceof Error){
    return res.status(500).json({message:'system error ao dar getall' + response.message})
  }

  return res.status(200).json({message:'ordens encontradas',response})

})

orderRouter.post('/create',verifyToken,async (req,res) =>{
  const {cart_id} = req.body
  const user_id = await UtilitiesFactory.MakeTokenManipulator().getUserByToken(req.headers.authorization);
  
  const response = await controller.create({user_id,cart_id})

  if(response instanceof Error){
    return res.status(400).json({message:'ocorreu algum erro aqui' + response.message})
  }

  return res.status(201).json({message:'seu pedido foi enviado com sucesso, aguarde a analise e entraremos em contato',response})

})


export {orderRouter}