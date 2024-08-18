import Link from "next/link"

const page = () => {
  return (
    <section className=" lg:px-32 py-16 md:px-16
     px-4 flex items-center justify-center flex-col ">
        <div className=" shadow-md p-3
         rounded-md flex w-full md:w-1/2 items-center flex-col justify-center">
            <h1 className="font-bold text-2xl">Sign In</h1>
            <hr className=" border-slate-300 border w-full mb-2 mt-2"/>
            <div className=" w-full mb-2">
                <input placeholder="Email" className=" bg-slate-100 p-2 py-4 rounded-md w-full outline-none border-none text-sm" type="email" name="" id="" />
            </div>
            <div className=" w-full mt-2">
                <input placeholder="Password" className=" bg-slate-100 p-2 py-4 rounded-md w-full outline-none border-none text-sm" type="password" name="" id="" />
            </div>
            <div className=" w-full mt-4">
                <button className=" bg-[#3D4A5D] w-full p-3 rounded-md text-white hover:bg-slate-900 duration-300 ease-in">SIGN IN</button>
                <p className="  text-right mt-2">Don&apos;t have an account? <Link className=" text-blue-400 cursor-pointer underline" href={"/auth/signup"}>Create here</Link></p>
            </div>
        </div>
     </section>
  )
}

export default page