import createHttpError from "http-errors"

export default ((req,res,next)=>{
    // res.status(404).json({msg:'pash not found'})
    return next (createHttpError.NotFound('Pash Not found'))
})
