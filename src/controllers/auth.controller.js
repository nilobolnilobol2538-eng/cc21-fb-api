// @ts-nocheck
export const register=(req, res)=> {
 res.send('Register Controller')
}


//-----error------//
export const login = (req,res) => {
 throw(new Error('This is my way'))
   console.log( 9 * "ok")
   res.json({
   msg : 'Login Controller',
   body : req.body
 })
}

export const getMe = (req,res) => {
 res.json({msg : 'GetMe controller'})
}
