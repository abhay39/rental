import { Bath, BedDoubleIcon, MapPin, Pin } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";


// Define the Card component
const Card= ({ item }) => {
   const router=useRouter();
  return (
    <div onClick={()=>{
      router.push(`/listing/${item._id}`)
    }} className=" bg-white  rounded-md p-1">
      <Image src={item.imageUrls[0] || "https://firebasestorage.googleapis.com/v0/b/mern-auth-1c4ae.appspot.com/o/1695720983512neyney.jfif?alt=media&token=d6f8774e-305f-4694-9860-aeb2ec942798"} height={200} width={300} className=" h-[230px] w-full object-cover hover:scale-[1.02] cursor-pointer duration-300 transition-all rounded-md" alt={item.name} />
      <div className=" ml-3 mt-2 flex flex-col gap-2">
        <h2 className=" font-bold">{item.name.slice(0,25)}</h2>
        <p className=" flex items-center text-xs lg:text-sm gap-2"><MapPin size={15} color="green"/>{item.address}</p>
        <div dangerouslySetInnerHTML={{ __html: item.description.slice(0,150) }} className=" text-xs text-slate-500"></div>
        <p className=" text-green-600 font-bold">&#8377;.{item.regularPrice}/- </p>
        <div className=" flex items-center gap-4">
          <p className=" flex items-center gap-1">{item.bedroom} <BedDoubleIcon size={16} color="green"/></p>
          <p className=" flex items-center gap-1">{item.bathroom} <Bath size={16} color="green"/> </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
