"use client"
import { useCallback, useEffect, useState } from "react";
import Card from "../component/Card";

const Searching = ({ params }) => {
  const [datas,setDatas]=useState([]);


  const getListings = useCallback(async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/listing/getListing/search/${params.search}`);
      const data = await res.json();
      setDatas(data);
    } catch (error) {
      console.error('Error fetching listings:', error);
    }
  }, [params.search]); // Only depends on params.search
  
  useEffect(() => {
    getListings();
  }, [params.search, getListings]);


  return (
    <section className=" lg:px-32 md:px-16 px-4 py-5 bg-slate-100 min-h-screen">
      <div className=" grid grid-cols-1 lg:grid-cols-3 gap-10 w-full">
        {
          datas.length>0?
          (datas.map((item,index)=>{
            return( <Card item={item} key={index}/>)
          }))
          :
          (<h1 className=" font-medium text-xl">No Results found</h1>)
        }
      </div>
    </section>
  )
}

export default Searching