import mongoose  from "mongoose";


 const dbConnection = () =>{
  mongoose.connect(process.env.MONGO_URI,{
    dbName:'CAREER_SAFALTA'
  }).then(()=>{
    console.log("dataBase connection succesfully")
  }).catch((err)=>{
    throw new Error(`Error occured while connecting with database :${err} `)
  })
}
export {dbConnection}