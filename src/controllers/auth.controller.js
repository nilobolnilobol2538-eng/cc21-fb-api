import createHttpError from "http-errors"
import identityKeyUtil from "../utils/identity-key.util.js"
import prisma from "../config/prisma.config.js"
import bcrypt from "bcryptjs"
import { Prisma } from "../generated/prisma/index.js"
import { loginSchema, registerSchema } from "../validations/schema.js"
import jwt from "jsonwebtoken"

// @ts-nocheck
//---register---//
export const register= async(req, res, next)=> {
  const {identity, firstName, lastName, password, confirmPassword} = req.body

  //valodation
    const user = registerSchema.parse(req.body) 
    console.log(user)

  // if(confirmPassword !== password){
  //   return next(createHttpError[400]('checck comfirm -password'))
  // }

  // check Identity
const identityKey = user.email ? 'email' : 'mobile'
if(!identity){
  return next (createHttpError[400]('identity must be email or phon number'))
}

//find user if alreadt
const haveUser = await prisma.user.findUnique({
  where : {[identityKey]:identity}
})
if(haveUser) {
  return next (createHttpError [409]('This user already register'))
}

//
const newUser = {...user, password : await bcrypt.hash(password,10) }


const result = await prisma.user.create({data : newUser})
res.json ({
  msg : 'Register Succesfull',
  result : result
 })
}


//-----login------//
export const login = async (req,res,next) => {

 
  const {identity,password} =req.body
// validation with zod//
  const user = loginSchema.parse(req.body)
  // console.log(user)
  const identityKey = user.email ? 'email ' : 'mobile'
  
// if(!identityKey){
//   return next (createHttpError[400]('identity must be email or phon number'))
// }

const foundUser = await prisma.user.findUnique({
  where : {[identityKey] : identity}
}) 

// have not user //
if(!foundUser){
  return next (createHttpError[401]('Invalid Login'))
}
//chack password//
let pwOK = await bcrypt.compare(password,foundUser.password)
if (!pwOK){
  return next (createHttpError[401]('Invalid Login'))
}

const payload = { id: foundUser.id}
const token = jwt.sign(payload, process.env.JWT_SECRET,{
  algorithm : 'HS256',
  expiresIn: '15d'
} )
// console.log(token)
const {password:pw,createdAt,updetedAt,...userdata } = foundUser

   res.json({
   msg : 'Login Succesful',
   token : token,
   user: userdata
 })
}



//------get me-----//
export const getMe = (req,res) => {
 res.json({msg : 'GetMe controller'})
}
