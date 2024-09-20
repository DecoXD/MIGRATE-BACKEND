import bcrypt from 'bcrypt'

export class Hash{

  toCrypt(password:string,salt?:number){
    try {
     const Salt = bcrypt.genSaltSync(salt)
     const hashPassword = bcrypt.hashSync(password,Salt)
     return hashPassword
    } catch (error) {
     console.log(error.message)
    }
   }
 
   toCompare(password:string,hashPassword:string){
     try {
       const passwordMatch = bcrypt.compareSync(password,hashPassword)
       return passwordMatch
     } catch (error) {
       console.log(error.message)
     }
   }
}