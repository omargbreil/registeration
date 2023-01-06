import mongoose from "mongoose";
import * as dotenv from "../config/.env"

export const connection = async () =>
{
    return await mongoose.connect(`${dotenv.dbUriOnline}`)
    .then(()=>console.log("database connected"))
    .catch(err=>console.log(`${err} database connection error`))
} 