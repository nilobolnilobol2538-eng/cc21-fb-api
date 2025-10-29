import createHttpError from "http-errors"
import identityKeyUtil from "../utils/identity-key.util.js"
import prisma from "../config/prisma.config.js"
import bcrypt from "bcryptjs"
import { Prisma } from "../generated/prisma/index.js"
import { registerSchema } from "../validations/schema.js"

// @ts-nocheck
export const register= async(req, res, next)=> {
  const {identity, firstName, lastName, password, confirmPassword} = req.body

  //valodation
    const rs = registerSchema.parse(req.body) 
    console.log(rs)

  if(confirmPassword !== password){
    return next(createHttpError[400]('checck comfirm -password'))
  }

  // check Identity
const identityKey = identityKeyUtil(identity)
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
const newUser = {
  [identityKey] : identity,
  password : await bcrypt.hash(password,10),
  firstName : firstName,
  lastName : lastName,
}

const result = await prisma.user.create({data : newUser})
res.json ({
  msg : 'Register Succesfull',
  result : result
 })
}


//-----login------//
export const login = (req,res,next) => {
  if(req.body.password === 'a1234'){
    return next(createHttpError[400]('bad password'))
  }
   res.json({
   msg : 'Login Controller',
   body : req.body
 })
}

export const getMe = (req,res) => {
 res.json({msg : 'GetMe controller'})
}
