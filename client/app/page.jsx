"use client";
import { useUser } from "@clerk/nextjs";
import {useState } from "react";
import HeroSection from "./component/HeroSection";
import Latest from "./component/Latest";
import ContactSection from "./component/ContactSection";
import Footer from "./component/Footer";



export default function Home() {
  const { isSignedIn, isLoaded, user } = useUser();


  
  if (!isLoaded) {
    return <h1>Loading...</h1>;
  }

  return (
    
      <main className="bg-[#F1F5F1] min-h-screen">
        <HeroSection />
        <Latest />
        <ContactSection />
        <Footer />
      </main>

  );
}
