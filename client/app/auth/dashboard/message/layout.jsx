"use client"
import { useRouter } from "next/navigation";
import Sidebar from "../../../component/Sidebar"
import { useUser } from "@clerk/nextjs";
import toast from "react-hot-toast";

const layout = ({children}) => {
  // const route=useRouter();
  //   const {isLoaded,isSignedIn,user} =useUser();
    
  //   if(!isSignedIn){
  //       toast.error("You are not authorized to access this page")
  //       route.push("/")
  //   }

  return (
    <section className="  lg:px-32 md:px-16 px-4 flex gap-2">
        <div className=" bg-slate-100 w-1/4">
            <Sidebar />
        </div>
        <div className=" bg-slate-100 w-3/4">
            {children}
        </div>
    </section>
  )
}

export default layout