export class HttpException extends Error {
    public statusCode:number
    constructor(message:string,statusCode:number){
      super()
      this.statusCode = statusCode
      this.message = message
    }

}


