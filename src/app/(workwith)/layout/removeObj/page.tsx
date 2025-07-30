'use client'

import { FileUpload } from "@/components/ui/file-upload"
import { LoaderOne } from "@/components/ui/loader";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import { Scissors, Sparkles } from "lucide-react"
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Image from "next/image";

function page() {

   const [files, setFiles] = useState<File[]>([]);
  const [loading,setLoading] = useState<boolean>(false)
  const [content,setContent] = useState<string>('')
  const [object,setObject] = useState<string>('')

  const {getToken} =  useAuth()

    const handleFileUpload = (files: File[]) => {
      setFiles(files);
    
    };


     const onSubmitHandler = async ()=>{

         try {
      setLoading(true)

      if(object.split(' ').length > 1){
        return toast.error("Please enter only one object name")
      }
     const formData = new FormData();
     formData.append('image',files[0])
     formData.append('object',object)


       const {data} = await axios.post('/api/ai/removeObject',
                        formData,
                      {
                         headers:{
                          Authorization:`Bearer ${await getToken()}`
                                 }});
        
       if(data.success){
        setContent(data.content)
        }
        else{
        toast.error(data.message)          
     };

     } catch (error:any) {
        toast.error(error.message)
     }
     setLoading(false)

     }
          
    useEffect(() => {
  console.log("Updated content:", content);
}, [content]);
  


  return (
    
       <div  className='h-full overflow-y-auto p-6 flex items-start flex-wrap gap-4 text-slate-700'>

      
      <div className='w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200' >
             <div className='flex items-center gap-3'>
              <Sparkles className='w-6 text-[#ed7777]'/>
              <h1 className='text-xl font-bold'>Object Removal</h1>
             </div>
    
          <p className='mt-8 text-lg font-bold mt'>Image Upload</p>
          <div className="w-full max-w-2xl mx-auto min-h-26 border border-dashed bg-white
                     dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg my-5"
          >
              <FileUpload onChange={handleFileUpload} />
            </div>
             <h1 className='text-md font-bold'>Discribe object to remove</h1>
              <div className="grid w-full gap-3 mt-8">
         
           <Textarea 
             placeholder="eg. car in background, free from the image ."
             id="message"
              onChange={(e)=>setObject(e.target.value)} />
             </div>
            <p className='mt-8 text-sm font-medium mt'>Be speicific about which you want for removal</p>

          <br />

          {
            loading ?
              (
                <span>
                  <LoaderOne />
                </span> 
              )     :

              (
                  <button 
                    className='bg-gradient-to-r from-orange-200 to-red-400 rounded-lg p-3 flex gap-3'
                    onClick={onSubmitHandler}
                  >
                   <Scissors className='w-5'/>
                    Remove Object
                  </button>
              )
          }
          
      </div>
    
         <div className='w-full max-w-lg p-4 bg-white rounded-lg flex 
              flex-col border border-gray-200 min-h-96 max-h-[600px]'
          >
            <div className='flex items-center gap-3'>
              <Scissors className='w-5 h-5 text-[#ed7777]'/>
             <h1 className='text-xl font-semibold'>Processed Image</h1>
            </div>

             {
                !content ?
                (
                   <div className='flex-1 flex justify-center items-center'>
                    <div className='text-sm flex-col items-center gap-5 text-gray-400'>
                   <Scissors className="mx-auto w-5"/>
                   <p>Upload image and click" Remove Background " to get started</p>
                   </div>
                  </div>
                ):
                (
                      <div className="relative w-[300px] h-[300px] flex items-center justify-center mt-5">
                            <Image
                              src={content}
                              alt="AI Generated Image"
                              fill
                              sizes="(max-width: 768px) 100vw, 400px"
                              className="object-contain rounded-lg"
                            />
                      </div>
                )

             }
            
    
         </div>
    
        </div>
  
  )
}

export default page
