"use client"
import { setUserInfo } from "@/store/userStore";
import { useUser } from "@clerk/nextjs";
import { SearchIcon } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";


type Info = {
  fullName: string;
  email: string;
  password: string;
  imageUrl: string;
}
const Navbar = () => {

  const {isLoaded,isSignedIn,user} =useUser();

  const [userData, setUserData] = useState<Info>({
    fullName: "",
    email: "",
    password: "",
    imageUrl: "",
  });

  const dispatch=useDispatch();

  const signUp = async (userData: Info) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/user/createAccount`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });
      
      const status = res.status;
      const result = await res.json();
      
      if (status === 201) {
        dispatch(setUserInfo(result.data))
      }
      else if (status === 202) {
        dispatch(setUserInfo(result.data))
      } else {
        // toast.error(result.message);
      }
      
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (user && isSignedIn) {
      const newUserdata: Info = {
        fullName: user.fullName || "",
        email: user.primaryEmailAddress?.emailAddress || "",
        password: "",  // Assuming you handle password separately
        imageUrl: user.imageUrl || "",
      };
      setUserData(newUserdata);
      signUp(newUserdata);
    }
  }, [isSignedIn]); // Added dependencies


  const pathname=usePathname();
  
  return (
    <nav className=" flex py-3 bg-white items-center flex-wrap shadow-md justify-between lg:px-32 md:px-16 px-4">
        <Link href={"/"} className=" text-2xl font-bold cursor-pointer duration-500 transition-all hover:opacity-55 text-black">Khoojo Room</Link>
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