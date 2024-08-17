"use client";
import { setUserInfo } from "@/store/userStore";
import { useUser } from "@clerk/nextjs";
import { lazy, Suspense, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

const HeroSection = lazy(() => import('./component/HeroSection'));
const Latest = lazy(() => import('./component/Latest'));

type Info = {
  fullName: string;
  email: string;
  password: string;
  imageUrl: string;
}

export default function Home() {
  const { isSignedIn, isLoaded, user } = useUser();


  
  if (!isLoaded) {
    return <h1>Loading...</h1>;
  }

  return (
    <Suspense fallback={<h1>Loading....</h1>}>
      <main className="bg-[#F1F5F1] min-h-screen">
        <HeroSection />
        <Latest />
      </main>
    </Suspense>
  );
}
