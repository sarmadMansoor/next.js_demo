import { error } from "console";
import mongoose from "mongoose";

export  const connect =async ()=> {
    try{
        mongoose.connect(process.env.MONGO_URI!)
        const connection = mongoose.connection;
        connection.on('connected' ,()=>{
            console.log('MongoDb connected successfull!!!');
        })


        connection.on('error',()=>{
            console.log('Mango Db connection error please make sure MongoDb is running '+ error);
            process.exit();
        })
    }
    catch(error){
        console.log('Something goes wrong !!!');
        console.log(error);
    }
}