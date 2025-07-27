"use client"
import Navbar from "./components/navbar";
import Hero from "./components/hero";
import AiTools from "./components/aiTools";
import TestiMonial from "./components/testiMonial";
import Plan from "./components/plan";
import Footer from "./components/footer";
import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import  { Toaster } from 'react-hot-toast';

export default function Home() {

  const {getToken} = useAuth()

  useEffect(()=>{
    getToken().then((token)=>console.log(token));
  },[])
  return (
    <>
    <div>
        < Toaster
            position="top-center"
            reverseOrder={false}
        />
    </div>
    <Navbar/>
    <Hero/>
    <AiTools/>
    <TestiMonial/>
    <Plan/>
    <Footer/>
    </>
  );
}
