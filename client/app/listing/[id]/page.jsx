"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

import { Armchair, Bath, BedDouble, ChevronLeft, ChevronRight, CookingPot, Forward, GlassWater, MapPin, ParkingCircle, Plug } from "lucide-react";
import { useRouter } from "next/navigation";

const images = [
  {
    original: "https://picsum.photos/id/1018/1000/600/",
    thumbnail: "https://picsum.photos/id/1018/250/150/",
  },
  {
    original: "https://picsum.photos/id/1015/1000/600/",
    thumbnail: "https://picsum.photos/id/1015/250/150/",
  },
  {
    original: "https://picsum.photos/id/1019/1000/600/",
    thumbnail: "https://picsum.photos/id/1019/250/150/",
  },
];

const ListingSingle = ({ params }) => {

  // State to keep track of the current image index
  const [currentIndex, setCurrentIndex] = useState(0);
  const [listing, setListing] = useState();

  const router=useRouter();
  // State to determine if the image is being hovered over
  const [isHovered, setIsHovered] = useState(false);

  // Function to show the previous slide
  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  // Function to show the next slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // useEffect hook to handle automatic slide transition
  useEffect(() => {
    // Start interval for automatic slide change if not hovered
    if (!isHovered) {
      const interval = setInterval(() => {
        nextSlide();
      }, 3000);

      // Cleanup the interval on component unmount
      return () => {
        clearInterval(interval);
      };
    }
  }, [isHovered]);

  // Handle mouse over event
  const handleMouseOver = ()=> {
    setIsHovered(true);
  };

  // Handle mouse leave event
  const handleMouseLeave = ()=> {
    setIsHovered(false);
  };

  const [copied, setCopied] = useState(false);

  const getListingDetails = useCallback(async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/listing/getSingleListing/${params.id}`);
      const data = await response.json();
      setListing(data);
    } catch (error) {
      console.error('Error fetching listing details:', error);
    }
  }, [params.id]); // Memoize based on params.id
  
  useEffect(() => {
    getListingDetails();
  }, [getListingDetails]);


  const [showDetails,setShowDetails]=useState(false)

  return (
    <section key={listing?._id} className=" min-h-screen lg:px-32 md:px-16 px-4 py-6">
      <div className=" flex items-end justify-end mr-7">
        <div className='border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer'>
          <Forward
            className='text-slate-500'
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              setCopied(true);
              setTimeout(() => {
                setCopied(false);
              }, 2000);
            }}
          />
        </div>
        {copied && (
          <p className='fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2'>
            Link copied!
          </p>
        )}
      </div>
      <div className="relative w-full mx-auto mt-4">
        <div
          className="relative h-[500px] mx-12 group hover:-translate-y-2"
          onMouseOver={handleMouseOver}
          onMouseLeave={handleMouseLeave}
        >
          <Image
            src={listing?.imageUrls[currentIndex]}
            alt={`Slider Image ${currentIndex + 1}`}
            layout="fill"
            objectFit="cover"
            className="rounded-xl transition-all duration-500 ease-in-out cursor-pointer"
          />
        </div>
        <button
          className="absolute left-0 top-1/2 transform h-[459px] rounded-xl  mx-1 -mt-[10px] -translate-y-1/2 text-white p-2 group"
          onClick={prevSlide}
        >
          <ChevronLeft className="text-gray-600 " />
        </button>
        <button
          className="absolute right-0 top-1/2 transform h-[459px] rounded-xl  mx-1 -mt-[10px] -translate-y-1/2  text-white p-2 group"
          onClick={nextSlide}
        >
          <ChevronRight className="text-gray-600 " />
        </button>
        <div className="flex justify-center mt-4">
          {images.map((_, index) => (
            <div
              key={index}
              className={`h-1 w-10 mx-1 ${index === currentIndex
                  ? "bg-[#beff46] rounded-xl"
                  : "bg-gray-300 rounded-xl"
                } transition-all duration-500 ease-in-out`}
            ></div>
          ))}
        </div>
      </div>
      <div className=" px-16 mt-4 flex items-center md:items-start flex-col gap-2">
        <h1 className=" bg-red-400 px-2 rounded-md w-20 text-center py-1 text-white font-bold uppercase ">{listing?.listingType}</h1>
        <h1 className=" text-xl font-bold justify-between flex flex-col md:flex-row items-center "><p>{listing?.name}</p></h1>
        <h1 className=" text-xl font-bold justify-between flex flex-col md:flex-row items-center "><p className=" text-green-600 text-xl">&#8377;. {listing?.regularPrice}/- Per month</p></h1>
        <p className=" flex items-center text-xs lg:text-sm gap-2"><MapPin size={15} color="green"/>{listing?.address}</p>
        <p className=" text-sm text-slate-500 text-justify">{listing?.description}</p>
        <div className=" grid grid-cols-1  md:grid-cols-3 gap-4 items-center">
          <p className="text-sm text-slate-500 flex items-center gap-1 font-bold">{listing?.bedroom} Bedrooms <BedDouble /></p>
          <p className="text-sm text-slate-500 flex items-center gap-1 font-bold"> {listing?.bathroom} Bathrooms <Bath /> </p>
          <p className="text-sm text-slate-500 flex items-center gap-1 font-bold"> {listing?.kitchen} Kitchen <CookingPot /> </p>
        </div>
        <div className=" grid grid-cols-2 lg:grid-cols-4 gap-4 text-slate-600 text-sm font-bold">
          <li className='flex items-center gap-1 whitespace-nowrap '>
            <ParkingCircle  />
            {listing?.parking ? 'Parking spot' : 'No Parking'}
          </li>
          <li className='flex items-center gap-1 whitespace-nowrap '>
            <Armchair  />
            {listing?.furnished ? 'Furnished' : 'Unfurnished'}
          </li>
          <li className='flex items-center gap-1 whitespace-nowrap '>
            <Plug  />
            {listing?.electricity ? 'Electricity' : 'No Electricity'}
          </li>
          <li className='flex items-center gap-1 whitespace-nowrap '>
            <GlassWater  />
            {listing?.water ? 'Water' : 'No Water'}
          </li>
        </div>
          <div >
            <button onClick={()=>{
              router.push(`/listing/${params.id}/message/${listing.addedBy._id}`)
            }} className=" bg-green-400 font-bold p-2 text-white rounded-md">CONTACT SELLER</button>
          </div>
      </div>
    </section>
  )
}

export default ListingSingle