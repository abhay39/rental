import express from 'express';
import { createNewUser } from '../controllers/userControllers.js';

const router=express.Router();

router.get('/',async(req,res)=>{
    res.json({
        message: "'Api running'"
    })
})

router.post("/createAccount",createNewUser)

export default router;