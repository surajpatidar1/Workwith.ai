'use client'

import { useState } from "react";
import Sidebar from "@/app/sidebar";


function sidelayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

    const [sideBar,setSideBar] = useState<boolean>(false);
  return (
   
    <html lang="en">
      <body
      >
             <div className="flex-1 w-full flex h-[calc(100vh-64px)]">
       <Sidebar sidebar={sideBar} setSideBar={setSideBar}/>
       <div className="flex-1 bg-[#F4F7F8">
        
       </div>
     </div>
        <main>
           {children}
        </main>
       
      </body>
    </html>
  )
}

export default sidelayout
