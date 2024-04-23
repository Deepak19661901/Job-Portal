import { catchAsyncError } from "../middlewares/catchAsyncError.js"
import ErrorHandler from "../middlewares/error.js"
import { Job } from "../models/jobSchema.js"


export const getAlljobs = catchAsyncError(async (req, res, next) => {
  const jobs = await Job.find({ expired: false })
  res.status(200).json({
    success: true,
    jobs
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
export const updateJobs = catchAsyncError(async(req,res,next)=>{
  const { role } = req.user
  if (role === "Job Seeker") {
    return next(new ErrorHandler("Job seeker is not allowed to access this resource", 400))
  }
   const {id} = req.params
   let job = await Job.findById(id)
   if(!job){
    return next(new ErrorHandler("Opps the Job is not Found!!"))
   }
   job = await Job.findByIdAndUpdate(id,req.body,{
    new:true,
    runValidators:true,
    useFindAndModify:false,
   })
   res.status(200).json({
    suceess:true,
    job,
    message:"Job Updated SuccessFully!"
   })

})

export const deleteJob = catchAsyncError(async(req,res,next)=>{
  const { role } = req.user
  if (role === "Job Seeker") {
    return next(new ErrorHandler("Job seeker is not allowed to access this resource", 400))
  }
  const {id} = req.params;
  const job = await Job.findByIdAndDelete(id)
  if(!job){
    return next(new ErrorHandler("opps Job not Found"))
  }
  res.status(200).json({
    success:true,
    job,
    message:" Job deleteted suceesFully"
  })
})

export const getSingleJob = catchAsyncError(async(req,res,next)=>{
  const {id} = req.params
  try {
    const job = await Job.findById(id)
    if(!job){
      return next(new ErrorHandler("Job is Not Found!",404))
    }
    res.status(200).json({
      success:true,
      job
    })
  } catch (error) {
    return next(new ErrorHandler("Invalid ID/cast Error",400))
  }
})
