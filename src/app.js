import exprees from "express";


const app = exprees();

app.use('/api/auth/login',(req,res)=>{res.send('auth service')})
app.use('/api/post',(req,res)=>{res.send('post service')})
app.use('/api/comment',(req,res)=>{res.send('comment service')})
app.use('/api/like',(req,res)=>{res.send('like service')})

export default app