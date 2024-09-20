import { HttpException } from "../exceptions/HttpException"

export function allFieldsAreFilled(fields:Record<string,any>):Boolean{
  const fieldsAreFilled = !(Object.values(fields).some((val) => !val))
  
  if(!fieldsAreFilled) throw new HttpException('por favor preencha todos os campos',409)
  return fieldsAreFilled
}