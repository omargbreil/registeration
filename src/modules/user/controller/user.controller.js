import { userModel } from "../../../../DB/models/user/user.model.js";
import  bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../../../../service/asynchandler.js";

export const signUp =asyncHandler(async(req,res,next)=>
{
  
        let{first_name,last_name , email , password , age} = req.body;

        const user = await userModel.findOne({email});
        
        if (!user) 
        {
            let hashed = bcrypt.hashSync(password , parseInt(process.env.saltRound));
            let addUser = new userModel({first_name,last_name , email , password:hashed , age});

         
                let savedUser = await addUser.save();
                res.status(201).json({message:"done" , savedUser});
           
        }else
        {
            return next(new Error("email already register" ,{cause:409 }));
        }    
        
    
        
    
})



export const signIn =asyncHandler(async(req,res,next)=>
{   

        let {email , password } = req.body;

        let user = await userModel.findOne({email});

        if (user) 
        {
            let comparePassword = bcrypt.compareSync(password , user.password);
            if (comparePassword) 
            {
                
                    let token = jwt.sign({id:user._id , isLoggedIn:true , email:email} , process.env.emailToken , {expiresIn:"1hr"});
                    res.status(200).json({message:"done" , token});

                

            }else
            {
                return next(new Error("incorrect password" , {cause:403}))
            }   

        }else
        {
            return next(new Error("you have to register first" ,{cause:409}))
        }
});


