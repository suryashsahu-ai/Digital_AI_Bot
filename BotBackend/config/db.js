 const  mongodb=require('mongoose')
 const denv=require('dotenv')
const { default: axios } = require('axios')
 denv.config()

 const connectDb =  async () => {
    try {
        await mongodb.connect(process.env.MONGODB_API_KEY)
        console.log("mongodb Connected....")
        
    } catch (error) {
        console.log("Error Connection Mongodb")
        
    }
    
 }
   module.exports=connectDb;