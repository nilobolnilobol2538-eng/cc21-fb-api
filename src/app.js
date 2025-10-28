import exprees from "express";
import authRoute from "./routes/auth.route.js";
import createHttpError from "http-errors";
// import ErrorMiddleware from "./middlewares/error.middleware.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import notfoundMiddleware from "./middlewares/notfound.middleware.js";

const app = exprees();
app.use(exprees.json())

app.use('/api/auth',authRoute)
app.use('/api/post',(req,res)=>{res.send('post service')})
app.use('/api/comment',(req,res)=>{res.send('comment service')})
app.use('/api/like',(req,res)=>{res.send('like service')})



//--not found--//
app.use(notfoundMiddleware)
//--error--//
app.use(errorMiddleware)
export default app