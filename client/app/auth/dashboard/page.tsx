"use client"
import { useUser } from "@clerk/nextjs"
import { useSelector } from "react-redux";

const page = () => {
    const {user}=useUser();

    const userDetails=useSelector(item=>item.userDetails);

  return (
    <section className=" flex items-center justify-center py-16 lg:px-32 md:px-16 px-4 w-full">
      <div className=" bg-slate-100 shadow-md p-4 w-full md:w-2/3 lg:w-1/2">
        <h1 className=" text-xl font-bold text-center">Profile</h1>
        <div className="flex items-center justify-center flex-col w-full">
          <img src={user?.imageUrl} alt="user" height={60} width={60} className=" rounded-full"/>
          <div className=" mt-3 w-full">
            <input readOnly value={userDetails?.fullName} type="text" name="fullName" className=" p-2 rounded-md text-sm outline-none border-none w-full" id="" />
            <br />
            <input readOnly value={userDetails?.email} type="text" name="email" className=" p-2 rounded-md outline-none w-full border-none mt-3 text-sm" id="" />
            <br />
            <input readOnly value={userDetails?.contactNumber}  type="number" name="contactNumber" className=" p-2 rounded-md outline-none border-none mt-3 w-full text-sm" id="" />
          </div>
      </div>
        <div className=" w-full mt-3">
          <button className="bg-green-700 p-2 rounded-md text-white w-full">CREATE LISTING</button>
        </div>
      </div>
    </section>
  )
}

export default page