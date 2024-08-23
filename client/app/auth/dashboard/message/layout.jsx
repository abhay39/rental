"use client"
import Sidebar from "../../../component/Sidebar"


const layout = ({ children }) => {
  // const route=useRouter();
  //   const {isLoaded,isSignedIn,user} =useUser();

  //   if(!isSignedIn){
  //       toast.error("You are not authorized to access this page")
  //       route.push("/")
  //   }

  return (
    <section className="  lg:px-32 relative md:px-16 px-4 flex gap-2">
      <div className="sm:fixed sm:left-0 sm:w-full lg:relative lg:bg-slate-200 lg:min-h-screen md:w-1/4 z-20 lg:z-0">
        <Sidebar />
      </div>

      <div className=" bg-slate-100 lg:w-3/4 w-full">
        {children}
      </div>
    </section>
  )
}

export default layout