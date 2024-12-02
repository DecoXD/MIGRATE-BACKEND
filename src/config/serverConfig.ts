import express, { Express} from "express";
import AuthRouter from "../routes/AuthRoute";
import { ProductAdminRouter } from "../routes/admin/ProductRoute.admin";
import { router as UserCartRouter} from "../routes/UserCartRoutes";
import { ProductCartRouter } from "../routes/ProductCartRoutes";
import { orderRouter } from "../routes/OrderRoutes";
import { ProductRouter } from "../routes/ProductRoutes";
import cors from 'cors'
export class ServerSetup {
    private server:Express 
    private corsOptions:any
    constructor(){
        this.server = express()
        this.corsOptions =  {
        origin: '*', // Substitua pelo URL do seu front-end
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true, // Permitir cookies
        optionsSuccessStatus: 204}
    }
    startServer(){
     
      this.boot()
    }

    private boot(){
      
      this.server.use(express.json())
      this.server.use(express.text())
      this.server.use(express.urlencoded({
        extended:true
      }))
      this.server.use(cors(this.corsOptions))
        this.server.use('/api/',AuthRouter)
        this.server.use('/api/p',ProductRouter)
        this.server.use('/api/admin/p',ProductAdminRouter)
        this.server.use('/api/cart',UserCartRouter)
        this.server.use('/api/productcart',ProductCartRouter)
        this.server.use('/api/order',orderRouter)
        this.server.listen(3000,() => {
            console.log('server are ready')
        })
    }
}