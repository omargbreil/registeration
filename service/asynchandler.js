
export const asyncHandler =(func)=>
{
    return (req,res,next)=>
    {
        func(req,res,next).catch(err =>
            {
                next(new Error(err.message,{cause:500}))
            })
    }
}

export const globalError = (err ,req ,res ,next)=>
{
    if (err) 
    {
        if (process.env.environment==="dev") 
        {
            res.status(err["cause"]||500).json(
                {
                    message:err.message,
                    stack:err.stack,
                    status:err["cause"]
                });    
        }else
        {
            res.status(err["cause"]||500).json(
                {
                    message:err.message,
                    status:err["cause"]
                });  
        }   
    }
}
          