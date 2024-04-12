import { catchAsyncError } from "./catchAsyncError.js";
import ErrorHandler from "./error.js";
import {User} from '../models/userSchema.js'

import jwt from 'jsonwebtoken'

export const isAuthorized = catchAsyncError(async(req,res,next)=>{
  const {token} = req.cookies   
  if(!token){
    return next (new ErrorHandler("User is not authorozed",400))
  }
  const decode = jwt.verify(token,process.env.JWT_SECRET_KEY)  // verification of the token , in token we have id also
  req.user = await User.findById(decode.id);
  next();
})
