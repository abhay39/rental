"use client"
import Image from "next/image"
import { useSelector } from "react-redux"

const Sidebar = () => {
    const user=useSelector(item=>item.userDetails);
    // console.log(user)
  return (
    <aside>
        <div className=" px-3 py-3 flex gap-2 items-center">
            <Image src={user?.imageUrl || "/baby.gif"} alt="user icon" height={40} width={40} className=" rounded-full h-11 w-11 cursor-pointer hover:opacity-85"/>
            <div>
                <h3 className="text-sm font-bold  text-gray-600">{user?.fullName}</h3>
                <p className="text-xs text-gray-500">Active Member since {new Date(user?.createdAt).toLocaleDateString()}</p>
            </div>
        </div>
        <hr className=" border border-slate-400"/>
        
    </aside>
  )
}

export default Sidebar