import User from "../models/userModel.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const createNewUser=async(req,res)=>{
    const data=req.body;
    // console.log(data)
    
    const checkIfUser=await User.findOne({
        email:data.email,
    });
    if(checkIfUser) return res.status(202).json({message:"User already exists",data:checkIfUser})

    const hashedPassword=await bcrypt.hash(data.password,10);

    const user=new User({
        fullName:data.fullName,
        email:data.email,
        password:hashedPassword,
        contactNumber:data.contactNumber,
        imageUrl:data.imageUrl,
    });
    await user.save();
    if(user){
        const token = jwt.sign({id:user._id},process.env.SECRETE_KEY,{
            expiresIn: '7days',
        })
        res.status(201).json({message:"User created successfully",token:token})
    }
    else{
        res.status(400).json({message:"Failed to create user"})
    }
}


export const updateContactNumber=async(req,res)=>{
    const {contactNumber}=req.body;
    const {id}=req.params;

    // console.log(contactNumber,id);
    const checkIfUser=await User.findById(id);
    if(checkIfUser) {
        checkIfUser.contactNumber=contactNumber;
        await checkIfUser.save();
        res.status(201).json({message:"Contact number updated successfully",data:checkIfUser})
    }
    else{
        res.status(404).json({message:"User not found"})
    }
    return;
}

export const getAllUsers=async(req,res)=>{
    try{
        const users=await User.find().select("-password");
        res.json(users)
    }catch(e){
        res.status(500).json({message:e.message})
    }
}


export const getUserDetails = async(req, res) => {
    const token=req.params.id;
    // console.log(token)
    if(!token) return res.status(401).json({message:"Token not provided"})
    const verifyToken = jwt.verify(token, process.env.SECRETE_KEY);
    const user=await User.findById(verifyToken.id).select("-password");
    if(!user) return res.status(404).json({message:"User not found"})
    res.json(user);
}


export const userLogin=async(req,res)=>{
    const {email,password}=req.body;
    const user=await User.findOne({email});
    if(!user) return res.status(404).json({message:"User not found"});
    const isMatch=await bcrypt.compare(password,user.password);
    if(!isMatch) return res.status(401).json({message:"Invalid credentials"});
    const token = jwt.sign({id:user._id},process.env.SECRETE_KEY,{
        expiresIn: '7days',
    })
    res.status(202).json({
        message:"User logged in successfully",
        token:token,
    })

    res.status(404).json({
        message:"User not found",
    })
}