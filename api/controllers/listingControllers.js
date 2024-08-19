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

export const getSingleListingBySearch = async (req, res) => {
    console.log(req.query);
    
    const searchValue = req.query.search || '';
    const minPrice = parseFloat(req.query.minPrice) || 0;
    const maxPrice = parseFloat(req.query.maxPrice) || Infinity;
    const bedrooms = parseInt(req.query.bedrooms) || null;
    const bathrooms = parseInt(req.query.bathrooms) || null;
    
    console.log("Search:", searchValue);
    console.log("Price Range:", minPrice, maxPrice);
    console.log("Bedrooms:", bedrooms);
    console.log("Bathrooms:", bathrooms);
  
    try {
      // Construct query object
      const query = {
        name: new RegExp(searchValue, 'i'), // Case-insensitive search
        regularPrice: { $gte: minPrice, $lte: maxPrice }, // Price range filter
      };
  
      if (bedrooms !== null) query.bedroom = { $gte: bedrooms };
      if (bathrooms !== null) query.bathroom = { $gte: bathrooms };
  
      // Find listings based on the query object
      const allListings = await Listing.find(query).populate('addedBy');
  
      // Send the filtered results as the response
      res.status(200).json(allListings);
    } catch (error) {
      console.error("Error fetching listings:", error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  

export const getListingOfCurrentUser=async(req,res)=>{
    console.log(req.params.id)
    const allListingss=await Listing.find({
        addedBy:req.params.id
    })
    res.json(allListingss)
}

