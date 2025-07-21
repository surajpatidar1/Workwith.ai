"use client";

import reactElementToJSXString from "react-element-to-jsx-string";
import { ButtonsCard } from "@/components/ui/tailwindcss-buttons";
import { useState } from "react";
import Image from "next/image";
import Markdown from 'react-markdown'


interface creationData{
    id: number,
    user_id: string,
    prompt: string,
    content:string,
    type: string,
    publish: boolean,
    likes: never[],
    created_at: string,
    updated_at: string,
    
}

function creationsItems({ item }: { item: creationData }) {

    const [expanded,setExpanded] = useState<boolean>(false)
  return (
    <div 
      onClick={()=>setExpanded(!expanded)} 
      className='p-4 max-w-5xl text-sm bg-white border border-gray-200 rounded-lg cursor-pointer'
    >
        <div className='flex justify-between items-center gap-4'>
            <h2>{item.prompt}</h2>
            <p className='text-gray-500'>{item.type} - {new Date(item.created_at).toLocaleDateString()}</p>
              
             <button className="p-[3px] relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-600 rounded-lg" />
              <div className="px-8 py-2 bg-white rounded-[6px]  relative group transition duration-200 text-black hover:bg-transparent hover:text-white">
                  {item.type}
              </div>
             </button>
  
        </div>
      {
        expanded && (
            <div>
                {item.type == 'image' ? (
                    <div>
                        <Image 
                           src={item.content} 
                           alt="img" height={100} 
                           width={100} 
                        />
                    </div>
                ):
                (
                    <div
                      className="mt-3 h-full overflow-y-scroll text-sms text-slate-700">
                        <div className="reset-tw">
                            <Markdown>{item.content}</Markdown>
                        </div>
                      </div>
                )}
            </div>
        )
      }
    </div>
  )
}

export default creationsItems
