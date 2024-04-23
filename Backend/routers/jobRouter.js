import express from 'express'
import { getAlljobs, postJob,getMyJob,updateJobs,deleteJob,getSingleJob } from '../controllers/jobControllers.js';
import { isAuthorized } from '../middlewares/auth.js';
const  router = express.Router();
router.get("/getall",getAlljobs)
router.post("/post",isAuthorized, postJob)
router.get("/getmyjobs",isAuthorized,getMyJob)
router.put("/update/:id",isAuthorized,updateJobs)
router.delete("/delete/:id",isAuthorized,deleteJob)
router.get("/:id",isAuthorized,getSingleJob)



export default router

