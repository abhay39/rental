"use client"
import { setUserInfo } from "@/store/userStore";
import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

const page = () => {
    const {user}=useUser();
    const router=useRouter();
    const dispatch=useDispatch();
    const userDetails=useSelector(item=>item.userDetails);
    const [openModel,setOpenModel] = useState<boolean>(false)
    const [contactNumber,setContactNumber] = useState<number>()

    const updateMobileNumber=async()=>{
      console.log("text")
      let res= await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/user/updateContact/${userDetails?._id}`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contactNumber: contactNumber,
        })
      })
      const data=await res.json();
      if(res.status===201){
        toast.success(data.message);
        dispatch(setUserInfo(data.data));
        setOpenModel(false)
      }else{
        toast.error(data.message);
      }
    }

    useEffect(()=>{
      if(userDetails){
        if(!userDetails.contactNumber){
          setOpenModel(true)
        }
      }
    },[userDetails])


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
          <button onClick={()=>{
            router.push('/auth/dashboard/newListing')
          }} className="bg-green-700 p-2 rounded-md text-white w-full">CREATE LISTING</button>
        </div>
      </div>

      {
        openModel && (
          <div className=" absolute top-0 h-screen w-full backdrop-blur-sm flex items-center justify-center">
            <div className=" bg-white rounded-md p-4">
              <h1 className=" font-bold text-2xl text-center">Update Contact Number</h1>
              <div>
                <input onChange={(e)=>{
                  setContactNumber(parseInt(e.target.value))
                }} placeholder="Enter contact number"  type="number" name="contactNumber" className=" p-2 rounded-md outline-none border-none bg-slate-200 text-sm mt-3 w-full " id="" />

                <button  onClick={updateMobileNumber}  className="bg-green-700 mt-3 p-2 rounded-md text-white w-full">UPDATE CONTACT </button>
              </div>
            </div>
          </div>
        )
      }
    </section>
  )
}

export default page