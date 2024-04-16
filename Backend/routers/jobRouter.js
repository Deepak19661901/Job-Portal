import express from 'express'
import { getAlljobs, postJob,getMyJob } from '../controllers/jobControllers.js';
import { isAuthorized } from '../middlewares/auth.js';
const  router = express.Router();
router.get("/getall",getAlljobs)
router.post("/post",isAuthorized, postJob)
router.get("/getmyjobs",isAuthorized,getMyJob)



export default router

