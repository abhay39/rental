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

  const [userData, setUserData] = useState<Info>({
    fullName: "",
    email: "",
    password: "",
    imageUrl: "",
  });

  const dispatch=useDispatch();

  const signUp = async (userData: Info) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/user/createAccount`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });
      
      const status = res.status;
      const result = await res.json();
      
      if (status === 201) {
        dispatch(setUserInfo(result.data))
      }
      else if (status === 202) {
        dispatch(setUserInfo(result.data))
      } else {
        // toast.error(result.message);
      }
      
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (user && isSignedIn) {
      const newUserdata: Info = {
        fullName: user.fullName || "",
        email: user.primaryEmailAddress?.emailAddress || "",
        password: "",  // Assuming you handle password separately
        imageUrl: user.imageUrl || "",
      };
      setUserData(newUserdata);
      signUp(newUserdata);
    }
  }, [user, isSignedIn]); // Added dependencies

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
