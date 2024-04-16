import mongoose  from "mongoose";
import  validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config()



const userSchema = new mongoose.Schema({
  name:{
    type:String,
    required:[true,"Please Provide Your Name"],
    minLength:[3,"Name must have atleast 3 character"],
    maxLength:[25,"Name must not exceed 20 charcter"]
  },
  email:{
    type:String,
    required:[true,"please Provide Your Email"],
    validate:[validator.isEmail,"please Enter valid Email"]
  },
  phone:{
    type:Number,
    required:[true,"please Enter your Phone Number"]
  },
  password:{
    type:String,
    required:[true,"Please Enter valid Password"],
    minLength:[8,"password must contain at least 8 character"],
    maxLength:[30,"password must not more than 30 charcter"],
    select:false
  },
  role:{
    type:String,
    required:[true,"please Provide Your Role"],
    enum:["Job Seeker",'Employer']
  },
  createdAt:{
    type:Date,
    default:Date.now
  }
});

// First we will DO hash the password befor sending the password to the database
userSchema.pre("save",async function(next){
  if(!this.isModified('password')){
    next()
  }
  this.password = await bcrypt.hash(this.password,10);
  
})

//compare the password
userSchema.methods.comparePassword = async function(enterdPassword){
  return await bcrypt.compare(enterdPassword,this.password)
}

//Generating a jwt token for authorization

userSchema.methods.getJWTToken = async function(){
  return jwt.sign({id:this._id},process.env.JWT_SECRET_KEY,{
    expiresIn:process.env.JWT_EXPIRE
    
  })
}

export const User = mongoose.model("User",userSchema)