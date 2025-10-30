import z, { date } from "zod";
import { da } from "zod/locales";

 const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 const mobileRegex = /^[0-9]{10,15}$/


//--register--//
export const registerSchema = z.object({
    identity : z.string().min(2,"Email ro Phon-unmber require")
    .refine(value => emailRegex.test(value) || mobileRegex .test(value) ,{
        message : 'identity must be emal or phon number'
    }),
    firstName : z.string().min(2,"first name is require"),
    lastName : z.string().min(2,"last name is  require"),
    password : z.string().min(4,"password at least 4 characters"),
    confirmPassword : z.string().min(4,"confirm password is  require"),
    
}).refine(data => data.password === data.confirmPassword , {
    message : 'confirmPassword  must match password',
    path : ['confirmPassword ']
}).transform(data => {
    const key = emailRegex.test(data.identity) ? 'email ' : 'mobile'
    const newValue = {...data ,[key]: data.identity}
    delete newValue.identity
    delete newValue.confirmPassword
    return newValue
})

//--login--//
export const loginSchema = z.object({
    identity : z.string().min(2,"Email ro Phon-unmber require")
    .refine(value => emailRegex.test(value) || mobileRegex .test(value) ,{
        message : 'identity must be emal or phon number'   
    }), // 
    password : z.string().min(4,"password at least 4 characters"),
}).transform(data => {
    const key = emailRegex.test(data.identity) ? 'email ' : 'mobile'
    const newValue = {...data ,[key]: data.identity}
    delete newValue.identity
    return newValue
})


 