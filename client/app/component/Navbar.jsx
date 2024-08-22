"use client"
import { setUserInfo } from "@/store/userStore";
import { useUser, SignOutButton } from "@clerk/nextjs";
import { deleteCookie, getCookie } from "cookies-next";
import { CircleX, Cross, Loader, LogOut, SearchIcon, User } from "lucide-react"
import Image from "next/image";
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {


  const [openModel, setOpenModel] = useState(false);
  const user = useSelector(item => item.userDetails);


  const getUserDetails = async (item) => {
    console.log(item)
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/user/getUserDetails/${item}`);
      const data = await res.json();
      console.log(data)
      dispatch(setUserInfo(data));
    } catch (err) {
      console.error('Error fetching user details:', err);
    }
  }

  useEffect(() => {
    const getCookies = getCookie('token');
    if (getCookies) {
      getUserDetails(getCookies)
    }
  }, [])

  const toggleModel = () => setOpenModel(!openModel);

  const [search, setSearch] = useState()
  const router = useRouter();


  const dispatch = useDispatch();
  // Added dependencies


  const pathname = usePathname();

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


  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];


  return (
    <div className=" flex sticky top-0 z-50 w-full py-3 bg-white items-center flex-wrap shadow-md justify-between lg:px-32 md:px-16 px-4">
      <Link href={"/"} className=" text-2xl font-bold cursor-pointer duration-500 transition-all hover:opacity-55 text-black">Khoojo Room</Link>
      <div className=" border-black w-[30%] hidden rounded-xl md:flex gap-2 p-2 items-center bg-slate-200">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search here..."
          type="text"
          className="bg-slate-200 w-full border-none outline-none"
        />
        {search?.length > 0 ? (
          <div className="flex gap-2 items-center">
            <div className="animate-spin">
              <Loader size={18} />
            </div>
            <div
              className="hover:bg-slate-400 rounded-full p-1"
              onClick={() => setSearch('')} // Set search to an empty string to clear it
            >
              <CircleX size={18} />
            </div>
          </div>
        ) : (
          <SearchIcon size={18} />
        )}
      </div>

      <nav className=" flex gap-4 items-center">
        <ul className="flex gap-4 font-medium items-center">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link href={href} className={`${pathname === href ? "font-bold text-green-700" : "font-medium"} duration-500 transition-all hover:opacity-55`}>
                {label}
              </Link>
            </li>
          ))}
        </ul>
      <div className=" relative">
        {
          user ? (<button onClick={toggleModel} className={`${pathname === "sign-in" ? "font-bold text-green-700" : "font-medium"} duration-500 transition-all hover:opacity-55`}>
            <Image
              loading="lazy"
              src={user?.imageUrl}
              alt="user"
              height={30}
              width={30}
              className="rounded-full object-cover h-8 w-8"
            />

          </button>) : (<Link href="/auth/signin" className={`${pathname === "/auth/signin" ? "font-bold text-green-700" : "font-medium"} duration-500 transition-all hover:opacity-55`}>Login</Link>)
        }
        {
          openModel && (
            <div className=" bg-slate-300 absolute top-[50px] right-2 rounded-md p-1 flex flex-col gap-3 px-10 items-start">
              <Link className="flex gap-1 items-center  p-1 w-full" onClick={toggleModel} href={"/auth/dashboard"} > <User size={16}/>Profile</Link>
              <button onClick={()=>{
                dispatch(setUserInfo(null));
                deleteCookie('token')
                setOpenModel(false);
                router.push('/');
              }} className="flex gap-1 items-center  p-1 w-full"> <LogOut size={16}/> Logout</button>
            </div>
          )
        }
      </div>
      </nav>
    </div>
  )
}

export default Navbar