import Sidebar from "../../../component/Sidebar"

const layout = ({children}) => {
  return (
    <section className=" min-h-screen lg:px-32 md:px-16 px-4 flex gap-2">
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