import User from "../models/userModel.js";

export const createNewUser=async(req,res)=>{
    const data=req.body;
    console.log(data);
    const checkIfUser=await User.findOne({
        email:data.email,
    });
    if(checkIfUser) return res.status(202).json({message:"User already exists",data:checkIfUser})
    const user=new User(data);
    await user.save();
    res.status(201).json({message:"User created successfully",data:user})
}

export const getAllUsers=async(req,res)=>{
    try{
        const users=await User.find();
        res.json(users)
    }catch(e){
        res.status(500).json({message:e.message})
    }
}