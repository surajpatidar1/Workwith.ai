'use client'

import { useState } from "react";
import Sidebar from "@/app/components/sidebar";


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
       <div className="flex-1 bg-gradient-to-r from-pink-100 via-purple-30 to-blue-100">
        <main>
           {children}
        </main>
       </div>
     </div>
        
       
      </body>
    </html>
  )
}

export default sidelayout
