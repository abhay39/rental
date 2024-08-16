import express from 'express';
import { createNewUser, updateContactNumber } from '../controllers/userControllers.js';

const router=express.Router();

router.get('/',async(req,res)=>{
    res.json({
        message: "'Api running'"
    })
})

router.post("/createAccount",createNewUser)
router.post("/updateContact/:id",updateContactNumber)

export default router;