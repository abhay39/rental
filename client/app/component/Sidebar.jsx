"use client"
import Image from "next/image"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux"
import ChatCard from "./ChatCard"

const Sidebar = () => {
    const user=useSelector(item=>item.userDetails);
    // console.log(user)
    const [allChats,setAllChats]=useState([]);
    
    const getAllChats=async()=>{
      let req=await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/messages/user/${user._id}/chat-list`);
      let data=await req.json();
      // console.log(data.users)
      setAllChats(data.users)
    }

    useEffect(()=>{
      if(user){
        getAllChats();
      }
    },[user])

    
  return (
    <aside>
        <div className=" px-3 py-3 flex gap-2 items-center">
            <Image src={user?.imageUrl || "/baby.gif"} alt="user icon" height={40} width={40} className=" rounded-full h-11 w-11 cursor-pointer hover:opacity-85"/>
            <div>
                <h3 className="text-sm font-bold  text-gray-600">{user?.fullName}</h3>
                <p className="text-xs text-gray-500">Active Member since {new Date(user?.createdAt).toLocaleDateString()}</p>
            </div>
        </div>
        <hr className=" border border-slate-400 mb-3"/>
        
        <div className=" p-3 flex gap-3 flex-col">
          {
            allChats.length > 0 && (
              allChats.map((item, index)=>{
                return (
                  <ChatCard item={item} key={index}/>
                )
              })
            )
          }
        </div>

    </aside>
  )
}

export default Sidebar