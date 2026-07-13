import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../models/user.model.js"

export const signup = async (req,res)=>{
    try{
        let {username , email , password } = req.body;
        
        if(!username || !email || !password){
        return    res.status(400).json({
                succes:false,
                message:"all fields are required"
            })
        }

        if(password.length <=4){
               return    res.status(400).json({
                succes:false,
                message:"password length should be more then 4"
            })
        }
             email = email.toLowerCase().trim();
             username = username.trim();
        const existing = await User.findOne({email});

        if(existing){
               return res.status(400).json({
                succes:false,
                message:"User already exists"
            })
        }

        const hashpass = await  bcrypt.hash(password,10)

      const created = await User.create({
        username,
        email,
        password:hashpass,
      }) 

      const token = jwt.sign(
        {id:created._id},
        process.env.JWT_SECRET,
        {expiresIn:"7d"})

         res.cookie("jwt", token , {
      httpOnly: true,
       secure:true,
            sameSite:"none",
            maxAge: 7*24*60*60*1000,
        })
          
    return res.status(201).json({
        success:true,
        message:"Sign Up Succesfully",

    })

        

    }
    catch(error){
          return res.status(500).json({
        success:false,
        message:"Sign up failed",
        
    })
    }
}

export const login = async  (req,res)=>{
    try{

     let {email ,  password } = req.body;

        if(!email || !password){
             return res.status(400).json({
            success:false,
            message:"All fields are Required"
        })
        }

  email = email.toLowerCase()
        
     const user = await User.findOne({email})
     
     if(!user){
        return res.status(400).json({
            success:false,
            message:"Information not valid"
        })
     }

     const rightpass = await bcrypt.compare(password,user.password)

     if(!rightpass){
        return res.status(400).json({
            success:false,
            message:"Something went Wrong"
        })
     }
     
      const token = jwt.sign(
        {id:user._id},
        process.env.JWT_SECRET,
        {expiresIn:"7d"})

        res.cookie("jwt", token , {
      httpOnly: true,
            secure:true,
            sameSite:"none",
            maxAge: 7*24*60*60*1000,
        })
         
        console.log(res.getHeaders());

           return res.status(200).json({
            success:true,
            message:"Login Succesfully",
            user:{
            _id: user._id,
            username:user.username,
            email:user.email,
            role:user.role
            }
        })

    }
    catch(error){
    return res.status(500).json({
            success:false,
            message:"Something went wrong"
        })
    }
} 


export const logout = async (req,res)=>{
    res.cookie("jwt", "" , {maxAge:0})
    res.json({message:"logout succesfully"})
} 