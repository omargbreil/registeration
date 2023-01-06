import { userModel } from "../../../../DB/models/user/user.model.js";
import  bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {sendEmail} from "../../../../service/sendemail.js"
import { asyncHandler } from "../../../../service/asynchandler.js";

export const signUp =asyncHandler(async(req,res,next)=>
{
  
        let{first_name,last_name , email , password , age} = req.body;

        const user = await userModel.findOne({email});
        
        if (!user) 
        {
            let hashed = bcrypt.hashSync(password , parseInt(process.env.saltRound));
            let addUser = new userModel({first_name,last_name , email , password:hashed , age});

            let token = jwt.sign({id:addUser._id , email:email} , `${process.env.signatureToken}` , {expiresIn:"1hr"});
            let link =`${req.protocol}://${req.headers.host}/user/confirmEmail/${token}`;

            let message = `verify your email <a href="${link}">click here</a>`;

            let result =await sendEmail(email , message);

            

            
            if (result.accepted.length) 
            {
                let savedUser = await addUser.save();
                res.status(201).json({message:"done" , savedUser});
            }else
            {
                 return next(new Error("invalid email" , {cause:404}));
            
            }
        }else
        {
            return next(new Error("email already register" ,{cause:409 }));
        }    
        
    
        
    
})


        
    




export const confirmEmail =asyncHandler(async(req,res,next)=>
{
    
        let {token} = req.params;

        let decoded = jwt.verify(token , `${process.env.signatureToken}`);
        if (!decoded) 
        {
            return next( new Error("invalid token" , {cause:498}));
        }else
        {
            let update = await userModel.findByIdAndUpdate(decoded.id,
                {
                    is_confirmed:true
                },{new:true});
    
                if (update) 
                {
                    res.redirect('https://omargbreil.github.io/noxe/');
                }else
                {
                      
                    return next(new Error("not updated",{cause:424}))
                
                }
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
                if (user.is_confirmed) 
                {
                    let token = jwt.sign({id:user._id , isLoggedIn:true , email:email} , `${process.env.emailToken}` , {expiresIn:"1hr"});
                    res.status(200).json({message:"done" , token});

                }else
                {
                    return next(new Error("you have yo confirm" ,{cause:410}))
                }

            }else
            {
                return next(new Error("incorrect password" , {cause:403}))
            }   

        }else
        {
            return next(new Error("you have to register first" ,{cause:409}))
        }
});
            
            
 
