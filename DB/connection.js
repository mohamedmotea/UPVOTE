import mongoose from "mongoose";

const db_connection = async () =>{
  await mongoose.connect(process.env.DB_CONNECTION)
  .then(()=> console.log("Connect"))
 .catch(() => console.log('error connecting to database'))
} 

export default db_connection