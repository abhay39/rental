"use client"
import React from 'react'
import {useRouter} from 'next/navigation'
import { useUser, SignOutButton } from "@clerk/nextjs";
import toast from 'react-hot-toast'

const layout = ({children}) => {
    // const route=useRouter();
    // const {isLoaded,isSignedIn,user} =useUser();
    
    // if(!isSignedIn){
    //     toast.error("You are not authorized to access this page")
    //     route.push("/")
    // }

  return (
    <div>
       {children}
    </div>
  )
}

export default layout