import { catchAsyncError } from "../middlewares/catchAsyncError.js"
import ErrorHandler from "../middlewares/error.js"
import { Job } from "../models/jobSchema.js"


export const getAlljobs = catchAsyncError(async (req, res, next) => {
  const Jobs = await Job.findOne({ expired: false })
  res.status(200).json({
    success: true,
    Jobs
  })
})

export const postJob = catchAsyncError(async (req, res, next) => {
  const { role } = req.user
  if (role === "Job Seeker") {
    return next(new ErrorHandler("Job seeker is not allowed to access this resource", 400))
  }

  const { title, description, category, country, city, location, fixedSalary, salaryFrom, salaryTo} = req.body

  if (!title || !description || !category || !country || !city || !location) {
    return next(ErrorHandler("please Provide full job Details", 400))
  }
  if ((!salaryFrom || !salaryTo) && !fixedSalary) {
    return next(ErrorHandler("please provide either fixed salary or ranged salary"))
  }
  if(salaryFrom && salaryTo && fixedSalary){
    return next(ErrorHandler("cannot Enter fixed salary and ranged salary together"))
  }
  const postedBy =  req.user._id
  const job = await Job.create({
    title, description, category, country, city, location, fixedSalary, salaryFrom, salaryTo,postedBy
  })
  
  res.status(200).json({
    success:true,
    message:"Job Posted Sucessfully",
    job,
  })
})

export const getMyJob = catchAsyncError(async(req,res,next)=>{
  const { role } = req.user
  if (role === "Job Seeker") {
    return next(new ErrorHandler("Job seeker is not allowed to access this resource", 400))
  }
  const myJobs = await Job.find({postedBy:req.user._id}) //Here we Will get the id of that particular Employeer so we can find that how many Post he has Posted by his ID(logic)

  res.status(200).json({
    success:true,
    myJobs,
  })
})

