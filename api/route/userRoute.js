import express from 'express';
import { createNewUser, getUserDetails, updateContactNumber, userLogin } from '../controllers/userControllers.js';

const router=express.Router();

router.get('/',async(req,res)=>{
    res.json({
        message: "'Api running'"
    })
})

router.post("/createAccount",createNewUser)
router.post("/updateContact/:id",updateContactNumber)
router.post("/signin",userLogin)
router.get("/getUserDetails/:id",getUserDetails)

export default router;