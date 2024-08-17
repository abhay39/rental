import express from 'express';
import { createListing, getListing, getListingOfCurrentUser, getSingleListing, getSingleListingBySearch } from '../controllers/listingControllers.js';

const router=express.Router();

router.get('/',async(req,res)=>{
    res.json({
        message: "'Api running'"
    })
})

router.post("/addListing",createListing)
router.get("/getListing",getListing)
router.get("/getListing/:id",getSingleListing)
router.get("/getListing/search/:searchValue",getSingleListingBySearch)
router.get("/getListingOfCurrentUser/:id",getListingOfCurrentUser)

export default router;