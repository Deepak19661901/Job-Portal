import { json } from "express"


class ErrorHandler extends Error{
  constructor(message,statusCode,){

    super(message)
    this.statusCode = statusCode

  }
}

export const errorMiddleWare = (err,req,res,next)=>{
  err.message = err.message || "Internal Serval Error"
  err.statusCode = err.statusCode || 500

  if(err.name==='CaseError'){
    const message = `Resourece Not Found .Invalid ${err.path}`
    err = new ErrorHandler(message,400);
  }
  if(err.code===1100){
    const message = ` Duplicate ${Object.keys(err.keyValue)} Entered`
    err = new ErrorHandler(message,400);
  }

  if(err.name==="JsonWebTokenError"){
    const message = `Json webToken is invalid ,Try Again`
    err = new ErrorHandler(message,400);
  }
  if(err.name==='TokenExpiredError'){
    const message = `json webToken is expired. Try Again`
    err = new ErrorHandler(message,400);
  }
  return res.status(statusCode).json({
    sucess:false,
    message:err.message,  
  })
  
}
export default ErrorHandler;