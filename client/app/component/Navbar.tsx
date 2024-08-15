"use client"
import { UserButton, useUser } from "@clerk/nextjs";
import { SearchIcon } from "lucide-react"
import Image from "next/image";
import Link from "next/link"
import { usePathname } from "next/navigation"
import path from "path";

const Navbar = () => {

  const {isLoaded,isSignedIn,user} =useUser();

  const pathname=usePathname();
  
  return (
    <nav className=" flex py-3 bg-white items-center flex-wrap shadow-md justify-between lg:px-32 md:px-16 px-4">
        <h1 className=" text-2xl font-bold cursor-pointer duration-500 transition-all hover:opacity-55 text-black">Khoojo Room</h1>
        <div className=" border-black w-[30%] hidden rounded-xl md:flex gap-2 p-2 items-center bg-slate-300">
            <input placeholder="Search here..." type="text" className="  bg-slate-300 w-full border-none outline-none" name="" id="" />
            <SearchIcon size={18} />
        </div>
        <ul className=" flex gap-4 font-medium items-center">
            <li><Link href="/" className={`${pathname==="/"?"font-bold text-green-700":"font-medium"} duration-500 transition-all hover:opacity-55`}>Home</Link></li>
            <li><Link href="/about" className={`${pathname==="/about"?"font-bold text-green-700":"font-medium"} duration-500 transition-all hover:opacity-55`}>About</Link></li>
            <li><Link href="/contact" className={`${pathname==="/contact"?"font-bold text-green-700":"font-medium"} duration-500 transition-all hover:opacity-55`}>Contact</Link></li>
            <li>
              {
                isSignedIn ? (<Link href="/auth/dashboard" className={`${pathname==="sign-in"?"font-bold text-green-700":"font-medium"} duration-500 transition-all hover:opacity-55`}>
                  <img src={user?.imageUrl} alt="user" height={30} width={30} className=" rounded-full"/>
                </Link>) :(<Link href="/sign-in" className={`${pathname==="/sign-in"?"font-bold text-green-700":"font-medium"} duration-500 transition-all hover:opacity-55`}>Login</Link>)
              }
            </li>
        </ul>
    </nav>
  )
}

export default Navbar