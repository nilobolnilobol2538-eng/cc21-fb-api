// import express from 'express'
// const authRoute = express.Router()

// authRoute.post('/register', (req,res)=>{res.send('Register route')})
// authRoute.post('/login',(req, res)=>{
//   res.send({
//     msg : 'Login route',
//     body : req.body
//   })
// })
// authRoute.get('/me', (req,res)=>{res.send('Get me route')})

// export default authRoute


import { Router } from "express";
import { getMe, login, register } from "../controllers/auth.controller.js";


const authRoute = Router()

authRoute.post('/register', register)
authRoute.post('/login', login)
authRoute.get('/me', getMe)

export default authRoute

