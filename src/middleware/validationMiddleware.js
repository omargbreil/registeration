
export const validation = (Schema)=>
{
    return (req,res,next)=>
    {
        let validationTypes = ["body" , "query" , "params" , "headers"];
        let validationError =[];

        validationTypes.forEach(key=>
            {
                if (Schema[key]) 
                {
                    let valid = Schema[key].validate(req[key] , {abortEarly:false});
                    if(valid.error)
                    {
                        validationError.push(valid.error.details);

                    }   
                }
            });

            if (validationError.length) 
            {
                return res.status(400).json({message:validationError});    
            }else
            {
                return next()
            }
    }
}