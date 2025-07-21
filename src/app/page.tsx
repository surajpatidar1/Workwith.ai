"use client"
import Navbar from "./components/navbar";
import Hero from "./components/hero";
import AiTools from "./components/aiTools";
import TestiMonial from "./components/testiMonial";
import Plan from "./components/plan";
import Footer from "./components/footer";

export default function Home() {
  return (
    <>
    <Navbar/>
    <Hero/>
    <AiTools/>
    <TestiMonial/>
    <Plan/>
    <Footer/>
    </>
  );
}
