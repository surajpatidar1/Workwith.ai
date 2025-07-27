'use client'
import { Edit, Sparkle } from 'lucide-react'
import React, { useState } from 'react'
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { ButtonsCard } from '@/components/ui/tailwindcss-buttons';
import { useAuth } from '@clerk/clerk-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { LoaderFive } from "@/components/ui/loader";
import Markdown from 'react-markdown';

interface value {
  length: number,
  text: string
}
function page() {

  // input data

  const placeholders = [
    "What's the first rule of Fight Club?",
    "Who is Tyler Durden?",
    "Where is Andrew Laeddis Hiding?",
    "Write a Javascript method to reverse a string",
    "How to assemble your own PC?",
  ];

  

  //  lenght

  const articlelength:value[] = [
    {length: 800,text: 'Short (500-800 words)'},
    {length: 1200, text: 'Medium (800-1200 words)'},
    {length: 1600, text: 'Long (1200+ words)'}
  ]

  const [selectedLength,setSelectedLength] = useState(articlelength[0])
  const [input,setInput] = useState<string>("")
  const [loading,setLoading] = useState<boolean>(false)
  const [content,setContent] = useState<string>("")

  const {getToken} = useAuth()

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
    setInput(e.target.value);
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
         setLoading(true)
         const prompt = `Write an article ${input} in ${selectedLength.text}`

       const {data} = await axios.post(
                        '/api/ai/generateArticle',
                         {
                          prompt,
                          lenght:selectedLength
                         },
                         {
                           headers:{
                            Authorization: `Bearer ${await getToken()}`
                                   }
                        });


       if(data.success){
        setContent(data.content)
       }
       else{
        toast.error(data.message)
       }
    } catch (error:any) {
       toast.error(error.message)
    }
    setLoading(false)
  };

  

  return (
    <div className='h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700'>
      
  
  <div className='w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200' >
         <div className='flex items-center gap-3'>
          <Sparkle className='w-6 text-[#4A7AFF]'/>
          <h1 className='text-xl font-semibold'>Article Configuration</h1>
         </div>
         <p className='mt-6 text-sm font-medium mb-5'>Article Topic</p>

         
        <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={onSubmit}
        
      />

      <p className='mt-8 text-sm font-medium mt'>Article Length</p>

      <div className='mt-3 flex gap-3 flex-wrap sm:max-w-9/11'>
        {
           articlelength.map((item,inx)=>(
            <span
              className={`text-xs px-4 py-1 border rounded-full cursor-pointer ${selectedLength.text == item.text ?  'bg-blue-50 text-blue-700' : 'text-gray-500 border-gray-300 '} `}
              key={inx}
              onClick={()=>setSelectedLength(item)}
            >
               {item.text}
            </span>
           ))
        }
      </div>
      <br />
      
        {
          loading ?
          <span>
            <LoaderFive text="Generating Article..." />
          </span>:
          (
            <button
               className='bg-gradient-to-r from-yellow-100 to-purple-300 rounded-lg p-3 flex gap-5'
               onClick={()=>onSubmit}
            >
              <Edit className='w-5'/>
              Generate Article
            </button>
            
          )
        }
        
      
  </div>

     <div className='w-full max-w-lg p-4 bg-white rounded-lg flex 
          flex-col border border-gray-200 min-h-96 max-h-[600px]'
      >
        <div className='flex items-center gap-3'>
         <Edit className='w-5 h-5 text-[#4A7AFF]'/>
         <h1 className='text-xl'>Generated Article</h1>
        </div>


         {
          !content ? 
               (
                <div className='flex-1 flex justify-center items-center'>
                  <div className='text-sm flex-col items-center gap-5 text-gray-400'>
                  <Edit className='w-9 h-9 flex items-center mx-auto'/> 
                  <p>Enter a topic and click " Generate article " to get started</p>
                  </div>
                 </div>
               ):(
                         <div 
                            className='mt-3 h-full overflow-y-scroll text-sm text-slate-600'
                          >
                                 <div className='reset-tw'>
                                  <Markdown>
                                     {content}
                                  </Markdown>
                                 
                                  </div>
                         </div>
               )
         }
        

     </div>

    </div>
  )
}

export default page
