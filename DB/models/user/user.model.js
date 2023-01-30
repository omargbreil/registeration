import {model , Schema} from "mongoose";

const userSchema = new Schema(
    {
        first_name:
        {
            type:String,
            required:[true, 'first name is required'],
            min:[2, "minimum 2 char"],
            max:[20 ,"max 20 char"]
        },
        last_name:
        {
            type:String,
            required:[true, 'last name is required'],
            min:[2, "minimum 2 char"],
            max:[20 ,"max 20 char"]
        },
        email:
        {
            type:String,
            unique:[true, 'already register'],
            required:[true , 'email is required']
        },
        password:
        {
            type:String,
            required:[true , "password is required"]
        }, 
        age:
        {
            type:Number,

        },
     
    },{timestamps:true});

    export const userModel = model('user' ,userSchema);