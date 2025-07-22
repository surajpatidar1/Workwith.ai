'use client'
import { Button } from "@/components/ui/button"
import Image from "next/image"

function footer() {
  return (
    <footer className="px-6 md:px-16 lg:px-24 xl:px-32 pt-8 w-full text-gray-500 mt-20">
    <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-500/30 pb-6">
        <div className="md:max-w-96">
             <Image 
                src={'/logo.svg'}
                alt="logo"
                width={100}
                height={50}
                />
            <p className="mt-6 text-sm">
               Experience the power of AI with Workwith.ai. <br /> Transform your content creation with our suite of premium AI tools.
               Write articles, generate image, and enhance your workflow.
            </p>
        </div>
        <div className="flex-1 flex items-start md:justify-end gap-20">
            <div>
                <h2 className="font-semibold mb-5 text-gray-800">Company</h2>
                <ul className="text-sm space-y-2">
                    <li><a href="#">Home</a></li>
                    <li><a href="#">About us</a></li>
                    <li><a href="#">Contact us</a></li>
                    <li><a href="#">Privacy policy</a></li>
                </ul>
            </div>
            <div>
                <h2 className="font-semibold text-gray-800 mb-5">Subscribe to our newsletter</h2>
                <div className="text-sm space-y-2">
                    <p>The latest news, articles, and resources, sent to your inbox weekly.</p>
                    <div className="flex items-center gap-2 pt-4">
                        <input className="border border-gray-500/30 placeholder-gray-500 focus:ring-2 ring-indigo-600 outline-none w-full max-w-64 h-9 rounded px-2" type="email" placeholder="Enter your email" />
                       
                        <button 
                          className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800
                            bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-200 
                            transition-colors focus:outline-none focus:ring-2
                             focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
                        >
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <p className="pt-4 text-center text-xs bg-slate-100 w-full md:text-sm pb-5">
        Copyright 2025 © Sooraj Patidar 💙. All Right Reserved.
    </p>
</footer>
  )
}

export default footer
