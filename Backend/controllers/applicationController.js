import {catchAsyncError} from '../middlewares/catchAsyncError.js'
import Errorhandler from '../middlewares/error.js'
import {Application} from '../models/applicationSchema.js'
import cloudinary from 'cloudinary'
import { Job } from '../models/jobSchema.js'

//logic for to get the Job who has applied for that employer
export const employerGetAllApplication = catchAsyncError(async(req,res,next)=>{
  const {role} = req.user
  if(role==='Job Seeker'){
    return next(
      new Errorhandler("Job Seeker is not allowed on this resource!",400)
    )
  }
  const {_id} = req.user
  const applications = await Application.find({'employerID.user':_id})
  res.status(200).json({
    success:true,
    applications
  })
})

export const jobseekerGetAllApplications = catchAsyncError(async(req,res,next)=>{
  const {role} = req.user
  if(role==='Employer'){ 
    return next(
      new Errorhandler("Employeer is not allowed on this resource!",400)
    )
  }
  const {_id} = req.user
  const applications = await Application.find({'applicantID.user':_id})
  res.status(200).json({
    success:true,
    applications
  })
})

export const jobSeekerDeleteApplication = catchAsyncError(async(req,res,next)=>{
  const {role} = req.user;
  if(role==='Employer'){
    return next(new Errorhandler("Employeer is not allowed to access this resource",400))
  }
  const {id} = req.params
  const application = await Application.findByIdAndDelete(id);
  if(!application){
    return next(new Errorhandler("opps application not found"))
  }

  res.status(200).json({
    success:true,
    message:"Application deleted Successfully"
  })
})
//post applicatiob by job seeker and we will Do file handling here also
export const postApplication = catchAsyncError(async(req,res,next)=>{
    const {role} = req.user
    if(role ==='Employer'){
      return next(
        new Errorhandler("Employee not allowed  to acces this resource!",400)
      )
    }
    if(!req.files || Object.keys(req.files).length===0){
      return next(new Errorhandler("Resume File required"))
    }
    const {resume} = req.files 
    const allowedFormats = ['image/png','image/jpeg','image/webp']
    if(!allowedFormats.includes(resume.mimetype)){
      return next(new Errorhandler("invalid file type. please upload your resume in png  or webp format",400))
    }
    const cloudinaryResponse = await cloudinary.uploader.upload(resume.tempFilePath)

    if(!cloudinaryResponse || cloudinaryResponse.error){
      console.error("cloudinary Error:",cloudinaryResponse.error || "Unknown cloudinary error")
      return next(new Errorhandler("failed to upload resume.",500))
    }

    const {name,email,coverLetter,phone,address,jobId} = req.body
    const applicantID = {
      user:req.user._id,
      role:"Job Seeker",
    };
    if(!jobId){
      return next(new Errorhandler("Job Not Found !",404))
    }
    
    const jobDetails = await Job.findById(jobId)
    if(!jobDetails){
      return next(new Errorhandler("Job Not Found!",404))
    }

    const employerID = {
      user:jobDetails.postedBy,
      role:"Employer"
    };

    if(!name || !email || !coverLetter ||!phone || !address || !applicantID|| !employerID|| !resume){
      return next(new Errorhandler("please fill all field",400))
    }
    const application = await Application.create({
      name ,
       email ,
       coverLetter
       ,phone
       , address
       ,applicantID
       ,employerID
       ,resume:{
        public_id:cloudinaryResponse.public_id,
        url:cloudinaryResponse.secure_url
       }

    })

    res.status(200)
    .json({
      success:true,
      message:"Application Submitted!",
      application,
    })

    


})