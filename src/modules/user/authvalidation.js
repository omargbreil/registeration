import joi from "joi";

export const signUpValidation =
{
    body: joi.object().required().keys(
        {
            first_name: joi.string().min(2).max(10).required().messages(
                {
                    "string.min":"not matched pattern",
                    "string.empty":"not matched pattern",
                    "string.max":"not matched pattern"
                }
            ),
            last_name: joi.string().min(2).max(10).required().messages(
                {
                    "string.min":"not matched pattern",
                    "string.empty":"not matched pattern",
                    "string.max":"not matched pattern"
                }
            ),
            email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
            password: joi.string().min(6).max(20).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required().messages(
                {
                    "string.pattern.base":"not matched pattern",
                    "string.min":"not matched pattern"
                }
            ),
           
            age:joi.number().min(16).max(110).required().messages(
                {
                    "number.min":"just +16 "
                }
            )


        }

    )
}


export const newPassword =
{
    body: joi.object().required().keys(
        {
            email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
            code:joi.string(),
            
            new_password: joi.string().min(6).max(20).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required().messages(
                {
                    "string.pattern.base":"not matched pattern",
                    "string.min":"not matched pattern"
                }
            ),
            confirm_password:joi.valid(joi.ref("new_password")).required()



        }

    )
} 

