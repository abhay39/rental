"use client"
import { setCookie } from "cookies-next"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import toast from "react-hot-toast"

const LoginPage = () => {
    const router=useRouter();
    const [data,setData]=useState({
        email: "",
        password: "",
    })

    const handleChange = (e) => {
        setData({...data, [e.target.name]: e.target.value})
    }

    const handleSign=async()=>{
        let res= await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/user/signin`,{
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        const status=res.status;
        res= await res.json();
        if(status===202){
            toast.success(res.message);
            setCookie("token",res.token)
            router.push("/")
        }else{
            toast.error(res.message);
        }
    }

  return (
    <section className=" lg:px-32 py-16 md:px-16
     px-4 flex items-center justify-center flex-col ">
        <div className=" shadow-md p-3
         rounded-md flex w-full md:w-1/2 items-center flex-col justify-center">
            <h1 className="font-bold text-2xl">Sign In</h1>
            <hr className=" border-slate-300 border w-full mb-2 mt-2"/>
            <div className=" w-full mb-2">
                <input onChange={handleChange} placeholder="Email" className=" bg-slate-100 p-2 py-4 rounded-md w-full outline-none border-none text-sm" type="email" name="email" id="" />
            </div>
            <div className=" w-full mt-2">
                <input onChange={handleChange} placeholder="Password" className=" bg-slate-100 p-2 py-4 rounded-md w-full outline-none border-none text-sm" type="password" name="password" id="" />
            </div>
            <div className=" w-full mt-4">
                <button onClick={handleSign} className=" bg-[#3D4A5D] w-full p-3 rounded-md text-white hover:bg-slate-900 duration-300 ease-in">SIGN IN</button>
                <p className="  text-right mt-2">Don&apos;t have an account? <Link className=" text-blue-400 cursor-pointer underline" href={"/auth/signup"}>Create here</Link></p>
            </div>
        </div>
     </section>
  )
}

export default LoginPage