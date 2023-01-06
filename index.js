import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
let direname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({path:path.join(direname,"./config/.env")});
import express from "express";
import cors from "cors";
import { userRouter } from "./src/modules/user/user.router.js";
import { connection } from "./DB/connection.js";
import { globalError } from "./service/asynchandler.js";


const app = express();

app.use(express.json());
app.use(cors());
app.use(`/user` , userRouter);
connection();

let port = process.env.port
app.listen(port,()=>console.log(`server running on ${port}`));
app.get("/" , (req,res)=>
{
    res.send("<h1>home page</h1>")
});
app.use(globalError)

app.get("*" , (req,res)=>res.status(404).json({message:"invalid api", status:404}));




