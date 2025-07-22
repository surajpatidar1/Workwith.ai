'use client'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import {  Image, Sparkles } from 'lucide-react'
import { useState } from 'react'

function page() {


  interface Style{
    title:string
  }

  const style:Style[]= [
   {title: "Realstic"},
   {title: "Ghibli style"},
   {title: "Anime style"},
   {title: "Cartoon style"},
   {title: "Fansty style"},
   {title: "Realistic style"},
   {title: "3D style"},
   {title: "Portrait style"},

  ];

  const [imageStyle,setImageStyle] = useState(style[0]);
  const [publish,setPublish] = useState(false)

  return (
    <div className='h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700'>
      
  
  <div className='w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200' >
         <div className='flex items-center gap-3'>
          <Sparkles className='w-6 text-[#ed7777]'/>
          <h1 className='text-xl font-bold'>AI Image Generator</h1>
         </div>
         <div className="grid w-full gap-3 mt-8">
           <Label  htmlFor="message">Discribe Your message</Label>
           <Textarea placeholder="Type your message here." id="message" />
             </div>

      <p className='mt-8 text-sm font-medium mt'>Style</p>

      <div className='mt-3 flex gap-3 flex-wrap sm:max-w-9/11'>
              {
                style.map((item,idx)=>(
                  <span
                  key={idx}
                  onClick={()=>setImageStyle(item)}
                   className={`text-xs px-4 py-1 border rounded-full cursor-pointer 
                    ${imageStyle.title == item.title ?  'bg-red-50 text-red-500' : 
                      'text-gray-500 border-gray-300 '} `}
                  >
                    {item.title}
                  </span>
                ))
              }
        </div>

        <div className='my-8 flex items-center gap-2 '>
          <Switch 
          onCheckedChange={(val: boolean) => setPublish(val)}
          checked={publish}
          />
          <p className='text-sm font-semibold'>Make this image Public</p>
        </div>
      <br />
      <button className='bg-gradient-to-r from-orange-200 to-red-200 rounded-lg p-3 flex gap-3'>
        <Image className='w-5'/>
        Generate Image
      </button>
  </div>

     <div className='w-full max-w-lg p-4 bg-white rounded-lg flex 
          flex-col border border-gray-200 min-h-96 max-h-[600px]'
      >
        <div className='flex items-center gap-3'>
          <Image className='w-5 h-5 text-[#ed7777]'/>
         <h1 className='text-xl font-semibold'>AI Generated Image</h1>
        </div>

        <div className='flex-1 flex justify-center items-center'>
          <div className='text-sm flex-col items-center gap-5 text-gray-400'>
               <Image/>
               <p>Enter style and click " Generate Images " to get started</p>
          </div>
        </div>

     </div>

    </div>
  )
}

export default page
