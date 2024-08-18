"use client"
import { useEffect, useState } from "react"
import Card from "./Card";

const Latest = () => {
    const [allRooms,setAllRooms]=useState([]);

    const getRooms=async()=>{
        const response=await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/listing/getListing`);
        const data=await response.json();
        // console.log(data)
        setAllRooms(data);
    }

    useEffect(()=>{
        getRooms();
    },[allRooms]);

  return (
    <section className=" min-h-screen lg:px-32 md:px-16 px-4 py-6">
        <h1 className=" text-3xl font-bold text-gray-700">Recent offers</h1>
        <div className=" grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {
                allRooms.map((item)=>{
                    return(
                        <Card key={item._id} item={item} />
                    )
                })
            }
        </div>
    </section>
  )
}

export default Latest