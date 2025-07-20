'use client'
import { Menu, X } from "lucide-react";
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react";
import {  SignIn,useUser } from "@clerk/clerk-react";


function page() {
  const  route = useRouter();
   const [sideBar,setSideBar] = useState<boolean>(false);
  const {user} = useUser();
  return user ?(
    <div className='flex flex-col items-start justify-start h-screen'>
     
     <nav className="w-full px-8 min-h-14 fkex items-center justify-between
           border-b border-gray-200">
      
      <Image 
      src={'/logo.svg'}
      alt="logo"
      width={100}
      height={100}
      onClick={()=>route.push("/")}
      />
      {
          sideBar ?
                 <X 
                 className="w-6 h-6 text-gray-600 ms:hidden" 
                 onClick={()=>setSideBar(false)} 
                 /> :
                 <Menu
                  className="w-6 h-6 text-gray-600 sm:hidden" 
                  onClick={()=>setSideBar(true)}
                />
      }
     </nav>

    </div>
  ) : (
    <div className="flex items-center justify-center h-screen">
     <SignIn/>
    </div>
  )
}


export  default page
