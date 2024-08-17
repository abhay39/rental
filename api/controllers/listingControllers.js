import Listing from "../models/listing.js";

export const createListing=async(req,res)=>{
    const data=req.body;
    console.log(data)
    try{
        const addListing=new Listing(data);
        await addListing.save();
        if(addListing){
            res.status(201).json({message:"Listing added successfully"})
        }
        else{
            res.status(400).json({message:"Failed to add listing"})
        }
    }catch(err){
        res.status(500).json({message:err.message})
    }
}

export const getListing=async(req,res)=>{
    const allListingss=await Listing.find({}).populate('addedBy');
    res.json(allListingss)
}

export const getSingleListing=async(req,res)=>{
    const allListingss=await Listing.findById(req.params.id).populate('addedBy');
    res.json(allListingss)
}

export const getSingleListingBySearch=async(req,res)=>{
    const searchValue = req.params.searchValue || '';
    console.log("Search",searchValue)

    const allListingss=await Listing.find({}).populate('addedBy');
    const filteredResults = allListingss.filter((item) => 
        item.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    res.status(200).json(filteredResults);
}

export const getListingOfCurrentUser=async(req,res)=>{
    console.log(req.params.id)
    const allListingss=await Listing.find({
        addedBy:req.params.id
    })
    res.json(allListingss)
}

