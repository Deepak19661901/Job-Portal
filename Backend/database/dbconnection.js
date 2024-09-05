import mongoose  from "mongoose";


 const dbConnection = () =>{
  mongoose.connect('mongodb+srv://deepakkumarnieit:tp31gYq56QFx0CLF@cluster0.8wiir.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',{
    dbName:'CAREER_SAFALTA'
  }).then(()=>{
    console.log("dataBase connection succesfully")
  }).catch((err)=>{
    throw new Error(`Error occured while connecting with database :${err} `)
  })
}
export {dbConnection}