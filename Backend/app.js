import express from 'express'
import dotenv  from 'dotenv';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import userRouter from './routers/userRouter.js';
import applicationRouter from './routers/applicationRouter.js'
import jobRouter from './routers/jobRouter.js'
import { dbConnection } from './controllers/dbconnection.js';
import { errorMiddleWare } from './middlewares/error.js';



const app = express();
dotenv.config({path:"./config/.env"})
app.use(cors({
  origin:[process.env.FRONTEND_URL],
  methods:['GET','POST','PUT','PUT'],
  credentials:true,
}))

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(fileUpload({
  useTempFiles:true,
  tempFileDir:'/temp/'
  }))

app.use('/api/v2/user',userRouter)
app.use('/api/v2/application',applicationRouter)
app.use('/api/v2/job',jobRouter)

dbConnection();
app.use(errorMiddleWare)

export default app;
