import mongoose from "mongoose";
import validator from 'validator'

const applicationSchema = new mongoose.Schema({
  name:{
    type:String,
    required:[true,"Please Provide your Name"],
    minLength:[3,"name must Conatin atleast 3 charchter"],
    maxLength:[30,"Name must not exceed 30 charcter"]
  },
  email:{
    type:String,
    validator:[validator.isEmail,"please Providea valid Email"],
    required:[true,"please Provide Email"]
  },
  coverLetter:{
    type:String,
    required:[true,"please Provide Cover letter!"]
  },
  phone:{
    type:Number,
    required:[true,"Please Provide Your Phone number!"]
  },
  address:{
    type:String,
    required:[true,"please Provide Your address"]
  },
  resume:{
    public_id:{
      type:String,
      required:true
    },
    url:{
      type:String,
      required:true
    }
  },
  applicantID:{
    user:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User",
      required:true
    },
    role:{
      type:String,
      enum:["Job Seeker"],
      required:true
    }
  },
  employerID:{
    user:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User",
      required:true
    },
    role:{
      type:String,
      enum:["Employer"],
      required:true
    }
  }
})
export const Application = mongoose.model("Application",applicationSchema)