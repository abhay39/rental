"use client"
import { Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";


type info = {
  fullName: string;
  email: string;
  password: string;
  imageUrl: string;
}


const SignUp = () => {

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [userData, setUserData] = useState<info>({
    fullName: "",
    email: "",
    password: "",
    imageUrl: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value })
   
  }


  const uploadPhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0];
    setIsLoading(true);
    const data = new FormData()
    data.append('file', file)
    data.append('upload_preset', 'khoojo rooms')
    data.append("cloud_name", "dgml5sbu6")
    let response = await fetch("https://api.cloudinary.com/v1_1/dgml5sbu6/image/upload", {
      method: "POST",
      body: data
    })
    response = await response.json();
    // console.log(response)
    setIsLoading(false)
    setUserData({
      ...userData,
      imageUrl: response?.secure_url
    })
  }

  const signUp = async () => {
    try {
      let res = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/user/createAccount`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      })
      const status = res.status;
      res = await res.json();
      if(status==201){
        toast.success(res.message);
      }else{
        toast.error(res.message);
      }
      
    } catch (err) {
      console.log(err)
    }
  }



  return (
    <section
      className=" lg:px-32 py-16 md:px-16
     px-4 flex items-center justify-center flex-col "
    >
      <div
        className=" shadow-md p-3
         rounded-md flex w-full md:w-1/2 items-center flex-col justify-center"
      >
        <h1 className="font-bold text-2xl">Sign Up</h1>
        <hr className=" border-slate-300 border w-full mb-2 mt-2" />
        <div className=" w-full mb-2">
          <input
          required={true}
            
            className=" bg-slate-100 p-2 py-4 rounded-md w-full outline-none border-none text-sm"
           
            name="fullName"
            id=""
            onChange={handleChange}
            placeholder="Full Name"
            
            type="text"
            
          />
        </div>
        <div className=" w-full mb-2">
          <input
          required={true}
            
            className=" bg-slate-100 p-2 py-4 rounded-md w-full outline-none border-none text-sm"
            
            onChange={handleChange}
            placeholder="Email"
           
            type="email"
            name="email"
            id=""
          />
        </div>
        <div className=" w-full mt-2">
          <input
            required={true}
            
            
            onChange={handleChange}
            placeholder="Password"
            className=" bg-slate-100 p-2 py-4 rounded-md w-full outline-none border-none text-sm"
            type="password"
            name="password"
            id=""
          />
        </div>
        <div className="w-full mt-2 bg-slate-100 py-2">
          <label
            htmlFor="image"
            className="w-full flex flex-col items-center justify-center cursor-pointer"
          >
            <Image
              src="/image.webp"
              alt="imguploader"
              className="rounded-full"
              height={50}
              width={50}
            />
            <p className=" text-sm text-slate-600 mt-1">Choose a profile picture</p>
          </label>
          <input
            required
            onChange={uploadPhoto}
            className="bg-slate-100 p-2 py-4 rounded-md w-full outline-none border-none hidden text-sm"
            type="file"
            accept="image/*"
            name="image"
            id="image"
          />
        </div>

        <div className=" w-full mt-4">
          <button onClick={signUp} className=" bg-[#3D4A5D] w-full p-3 rounded-md text-white hover:bg-slate-900 duration-300 ease-in">
            {
              isLoading? <div className=" animate-spin flex items-center justify-center"><Loader  size={16} /></div> :"SIGN UP"
            }
          </button>
          <p className="  text-right mt-2">
            Already have an account?{" "}
            <Link
              className=" text-blue-400 cursor-pointer underline"
              href={"/auth/signin"}
            >
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
