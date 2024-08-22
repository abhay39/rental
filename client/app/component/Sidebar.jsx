"use client"
import Image from "next/image"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux"
import ChatCard from "./ChatCard"
import { Menu } from "lucide-react";

const Sidebar = () => {
    const user=useSelector(item=>item.userDetails);
    // console.log(user)
    const [allChats,setAllChats]=useState([]);
    const [showUsers,setShowUsers]=useState(false);
    
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

    const handleTOogle=()=>{
      setShowUsers(!showUsers);
    }

    
  return (
    <aside> 
        <div className=" px-3 hidden lg:flex  py-3  gap-2 items-center justify-center md:justify-start">
            <Image src={user?.imageUrl || "/baby.gif"} alt="user icon" height={40} width={40} className=" rounded-full h-11 w-11 cursor-pointer hover:opacity-85"/>
            <div>
                <h3 className="text-sm font-bold  text-gray-600">{user?.fullName}</h3>
                <p className="text-xs  text-gray-500">Active Member since {new Date(user?.createdAt).toLocaleDateString()}</p>
            </div>
        </div>
        <hr className=" border border-slate-400 mb-3 hidden md:flex"/>
        
        <div className=" p-3 hidden lg:flex  gap-3 flex-col">
          {
            allChats.length > 0 && (
              allChats.map((item, index)=>{
                return (
                  <ChatCard handleTOogle={handleTOogle} item={item} key={index}/>
                )
              })
            )
          }
        </div>
        <div onClick={handleTOogle} className=" bg-slate-200 lg:hidden fixed rounded-full p-2 flex items-center justify-center w-12 h-12 cursor-pointer">
          <Menu />
        </div>
        {
          showUsers && (
            <div className=" fixed min-h-screen top-16 md:top-20 left-0 w-2/3 max-w-md bg-white p-4 rounded-md shadow-md">
              <div className=" flex gap-2 items-center">
                <div onClick={handleTOogle} className=" bg-slate-200 lg:hidden rounded-full p-2 flex gap-4 items-center justify-center w-12 h-12 cursor-pointer">
                <Menu />
              </div>
                <h2 className="text-xl font-bold">Users</h2>
              </div>
              <hr className="border border-slate-400 my-2"/>
              <div className="p-2 flex flex-col items-start gap-3">
                {
                  allChats.map((item, index)=>{
                    return (
                      <ChatCard handleTOogle={handleTOogle} item={item} key={index}/>
                    )
                  })
                }
              </div>
            </div>
          )
        }
    </aside>
  )
}

export default Sidebar