"use client"
import { Loader } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const NewListing = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [adding, setAdding] = useState<boolean>(false)
  const [urls, setUrls] = useState<string[]>([]);
  const userInfo=useSelector(item=>item.userDetails);


  const [listingInfo,setListingInfo]=useState({
    name: "",
    description: "",
    address: "",
    regularPrice: 0,
    bathroom: 0,
    bedroom: 0,
    kitchen:0,
    listingType:"",
    furnished: false,
    parking: false,
    electricity: false,
    water: false,
  })

  const router=useRouter();

  const addUrl = (newUrl:string) => {
    setUrls((prevUrls) => [...prevUrls, newUrl]);
  };

  const addListing=async()=>{
    setAdding(true)
    const response=await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/listing/addListing`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: listingInfo.name,
        description: listingInfo.description,
        address: listingInfo.address,
        regularPrice: listingInfo.regularPrice,
        bathroom: listingInfo.bathroom,
        bedroom: listingInfo.bedroom,
        kitchen: listingInfo.kitchen,
        listingType: listingInfo.listingType,
        furnished: listingInfo.furnished,
        parking: listingInfo.parking,
        electricity: listingInfo.electricity,
        water: listingInfo.water,
        imageUrls: urls,
        addedBy:userInfo._id
      })
    });
    const status=response.status;
    const data=await response.json();
    console.log(data)
    if(status===201){
      toast.success(data.message)
      router.push("/auth/dashboard")
    }else{
      toast.error(data.message)
    }
    setAdding(false)
  }

  const uploadPhotos = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    // console.log(files)

    if (!files) return;
    setIsLoading(true);
  
    const urls = await Promise.all(
      Array.from(files).map(async (file) => {
        const data = new FormData();
        data.append('file', file);
        data.append('upload_preset', 'khoojo rooms');
        data.append('cloud_name', 'dgml5sbu6');
  
        let response = await fetch("https://api.cloudinary.com/v1_1/dgml5sbu6/image/upload", {
          method: "POST",
          body: data
        });
  
        response = await response.json();
        return response?.secure_url;
      })
    );
  
    setIsLoading(false);
    setUrls((prevUrls) => [...prevUrls, ...urls]);
  };


  const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
    setListingInfo({...listingInfo,[e.target.name]: e.target.value})
  }
  

  return (
    <section className=" lg:px-32  flex items-center justify-center flex-col md:px-16  px-4 py-7">
      <h1 className=" font-bold text-3xl text-center">Create a Listing</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 w-full">
        <div className=" p-4 w-full">
          <div className=" w-full">
            <input onChange={handleChange} name="name" placeholder="Name of Listing" type="text" className=" w-full p-3  border-gray-700 border rounded-md bg-white"  />
            <input onChange={handleChange} name="address" placeholder="Address" type="text" className=" w-full p-3 mt-3 border-gray-700 border rounded-md bg-white"  />
            <textarea onChange={handleChange} name="description" rows={5} placeholder="Description"  className=" w-full p-3 mt-3 border-gray-700 border rounded-md bg-white"  />
          </div>

          <div className=" flex gap-5 flex-col">
            <div className="flex text-xl items-center gap-4">
              <div className="flex items-center gap-2">
                <input onChange={handleChange} value={"rent"} type="radio" name="listingType" id="rent" />
                <label htmlFor="rent">Rent</label>
              </div>
              <div className="flex items-center gap-2">
                <input onChange={handleChange} value={"sell"} type="radio" name="listingType" id="sell" />
                <label htmlFor="sell">Sell</label>
              </div>
            </div>


            <div className=" grid grid-cols-2 lg:grid-cols-4">
              <div className="flex text-xl items-center gap-2">
                <input onChange={handleChange} type="radio" value={"true"} name="parking" id="parking" />
                <label htmlFor="parking">Parking</label>
              </div>
              <div className="flex text-xl items-center gap-2">
                <input onChange={handleChange} type="radio" value={"true"} name="furnished" id="furnished" />
                <label htmlFor="furnished">Furnished</label>
              </div>
              <div className="flex text-xl items-center gap-2">
                <input onChange={handleChange} type="radio" value={"true"} name="water" id="water" />
                <label htmlFor="water">Water</label>
              </div>
              <div className="flex text-xl items-center gap-2">
                <input onChange={handleChange} type="radio" value={"true"} name="electricity" id="electricity" />
                <label htmlFor="electricity">Electricity</label>
              </div>
            </div>
            <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              <div className=" flex gap-3  items-center">
                <input onChange={handleChange} type="number"  className=" p-3 rounded-md bg-slate-200 w-full" name="bedroom"/>
                <label htmlFor="" className=" font-bold text-xl">Bedroom</label>
              </div>
              <div className=" flex gap-3  mt-3 items-center">
                <input onChange={handleChange} type="number"  className=" p-3 rounded-md bg-slate-200 w-full" name="bathroom"/>
                <label htmlFor="" className=" font-bold text-xl">Bathroom</label>
              </div>
              <div className=" flex gap-3 mt-3  items-center">
                <input onChange={handleChange} type="number"  className=" p-3 rounded-md bg-slate-200 w-full" name="kitchen"/>
                <label htmlFor="" className=" font-bold text-xl">Kitchen</label>
              </div>
            </div>
            <div className=" flex gap-3 items-center">
              <input onChange={handleChange} name="regularPrice" type="number"  className=" p-3 rounded-md bg-slate-200 w-[60%]"/>
              <label htmlFor="" className=" font-bold text-xl">&#8377;. Per Month</label>
            </div>
          </div>
        </div>

        {/* second part */}
        <div className=" p-4 w-full">
          <p className=" font-bold">Images: <span className=" font-light">The first image will be the cover (max 6)</span></p>
          <div>
           
              <div className="w-full mt-2 bg-slate-100 py-2">
              <label
                htmlFor="image"
                className="w-full flex flex-col items-center justify-center cursor-pointer"
              >
                <Image
                  src="/image.webp"
                  alt="imguploader"
                  className="rounded-full"
                  height={50}
                  width={50}
                />
                <p className=" text-sm text-slate-600 mt-1">Choose a profile picture</p>
              </label>
              <input
                required
                multiple
                onChange={uploadPhotos}
                className="bg-slate-100 p-2 py-4 rounded-md w-full outline-none border-none hidden text-sm"
                type="file"
                accept="image/*"
                name="image"
                id="image"
              />
            </div>
              {
                isLoading && (
                  <div className=" w-full mt-2 flex items-center justify-center text-white flex-col gap-2 bg-slate-500 p-6 rounded-md">
                    <div className=" animate-spin"> <Loader size={50} color=" white"/> 
                    </div>
                    <p>image uploading</p>
                  </div>)
              }
          </div>
        </div>
        <div>
          <button onClick={addListing} className=" bg-green-800 p-3
           rounded-md flex items-center justify-center text-center text-white w-full">
            {
              adding? <div className=" w-full mt-2 flex items-center justify-center text-white flex-col gap-2 rounded-md">
              <div className=" animate-spin"> <Loader size={30} color=" white"/> 
              </div>
              </div> : 'ADD LISTING'
            }
            </button>
        </div>
      </div>

    </section>
  )
}

export default NewListing