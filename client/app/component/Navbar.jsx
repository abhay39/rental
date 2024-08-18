"use client"
import { setUserInfo } from "@/store/userStore";
import { useUser, SignOutButton } from "@clerk/nextjs";
import { SearchIcon } from "lucide-react"
import Image from "next/image";
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const Navbar = () => {

  const {isLoaded,isSignedIn,user} =useUser();

  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    password: "",
    imageUrl: "",
  });


  const [openModel,setOpenModel]=useState(false);

  const toggleModel=()=>setOpenModel(!openModel);

  const [search,setSearch] = useState()
  const router=useRouter();


  const dispatch=useDispatch();



const signUp = useCallback(async (userData) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/user/createAccount`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const status = res.status;
    const result = await res.json();

    if (status === 201 || status === 202) {
      dispatch(setUserInfo(result.data));
    } else {
      // Handle other status codes if needed
      // toast.error(result.message);
    }
  } catch (err) {
    console.log(err);
  }
}, [dispatch]); // Only include dependencies that signUp relies on

useEffect(() => {
  if (user && isSignedIn) {
    const newUserData = {
      fullName: user.fullName || "",
      email: user.primaryEmailAddress?.emailAddress || "",
      password: "", // Assuming you handle password separately
      imageUrl: user.imageUrl || "",
    };
    setUserData(newUserData);
    signUp(newUserData);
  }
}, [isSignedIn, user, signUp]); // Added dependencies


  const pathname=usePathname();

  useEffect(() => {
    const handler = setTimeout(() => {
        if (search) {
            router.push(`/${search}`);
        }
    }, 500); // 500ms debounce time

    return () => {
        clearTimeout(handler);
    };
}, [search, router]);


  
  return (
    <nav className=" flex sticky top-0 z-50 w-full py-3 bg-white items-center flex-wrap shadow-md justify-between lg:px-32 md:px-16 px-4">
        <Link href={"/"} className=" text-2xl font-bold cursor-pointer duration-500 transition-all hover:opacity-55 text-black">Khoojo Room</Link>
        <div className=" border-black w-[30%] hidden rounded-xl md:flex gap-2 p-2 items-center bg-slate-200">
        <input
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search here..."
            type="text"
            className="bg-slate-200 w-full border-none outline-none"
        />
            <SearchIcon size={18} />
        </div>
        <ul className=" flex gap-4 font-medium items-center">
            <li><Link href="/" className={`${pathname==="/"?"font-bold text-green-700":"font-medium"} duration-500 transition-all hover:opacity-55`}>Home</Link></li>
            <li><Link href="/about" className={`${pathname==="/about"?"font-bold text-green-700":"font-medium"} duration-500 transition-all hover:opacity-55`}>About</Link></li>
            <li><Link href="/contact" className={`${pathname==="/contact"?"font-bold text-green-700":"font-medium"} duration-500 transition-all hover:opacity-55`}>Contact</Link></li>
            <li className=" relative">
              {
                isSignedIn ? (<button onClick={toggleModel} className={`${pathname==="sign-in"?"font-bold text-green-700":"font-medium"} duration-500 transition-all hover:opacity-55`}>
                  <Image src={user?.imageUrl} alt="user" height={30} width={30} className=" rounded-full"/>
                </button>) :(<Link href="/sign-in" className={`${pathname==="/sign-in"?"font-bold text-green-700":"font-medium"} duration-500 transition-all hover:opacity-55`}>Login</Link>)
              }
              {
                openModel && (
                  <div className=" bg-slate-300 absolute top-[50px] right-2 rounded-md p-3 flex flex-col gap-3 px-10 items-start">
                    <Link onClick={toggleModel} href={"/auth/dashboard"} className="">Profile</Link>
                    <SignOutButton className="">Logout </SignOutButton>
                  </div>
                )
              }
            </li>
        </ul>
    </nav>
  )
}

export default Navbar