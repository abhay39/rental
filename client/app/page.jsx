"use client";
import HeroSection from "./component/HeroSection";
import Latest from "./component/Latest";
import ContactSection from "./component/ContactSection";
import Footer from "./component/Footer";



export default function Home() {
  

  return (
    
      <main className="bg-[#F1F5F1] min-h-screen">
        <HeroSection />
        <Latest />
        <ContactSection />
        <Footer />
      </main>

  );
}
