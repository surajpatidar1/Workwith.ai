'use client';

import { useState } from "react";
import Sidebar from "@/app/components/sidebar";

function Sidelayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sideBar, setSideBar] = useState<boolean>(false);

  return (
    <div className="flex w-full min-h-screen overflow-x-hidden">
      <Sidebar sidebar={sideBar} setSideBar={setSideBar} />

      <div className="flex-1 bg-gradient-to-r from-pink-100 via-purple-30 to-blue-100">
        <main className="p-4">
          {children}
        </main>
      </div>
    </div>
  );
}

export default Sidelayout;
