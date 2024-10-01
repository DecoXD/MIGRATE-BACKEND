import express, { Express} from "express";
import AuthRouter from "../routes/AuthRoute";
import { ProductAdminRouter } from "../routes/admin/ProductRoute.admin";
import { router as UserCartRouter} from "../routes/UserCartRoutes";
import { VerifyUserPermissions } from "../middlewares/VerifyUserPermissions";

export class ServerSetup {
    private server:Express 
    constructor(){
        this.server = express()
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
        this.server.use('/',AuthRouter)
        this.server.use('/cart',UserCartRouter)

        this.server.use('/p/admin',VerifyUserPermissions,ProductAdminRouter)
        this.server.listen(3000,() => {
            console.log('server are ready')
        })
    }
}