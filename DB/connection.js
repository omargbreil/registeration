import mongoose from "mongoose";

export const connection = async () =>
{
    return await mongoose.connect("mongodb+srv://anas:anasanas@cluster0.su1hiba.mongodb.net/register")
    .then(()=>console.log("database connected"))
    .catch(err=>console.log(`${err} database connection error`))
} 