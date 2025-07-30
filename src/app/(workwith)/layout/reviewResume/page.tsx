'use client'

import { FileUpload } from "@/components/ui/file-upload"
import { LoaderOne } from "@/components/ui/loader";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import { File,  Sparkles } from "lucide-react"
import { useState } from "react";
import toast from "react-hot-toast";
import Markdown from "react-markdown";

function Page() {

  const [files, setFiles] = useState<File[]>([]);
    const handleFileUpload = (files: File[]) => {
      setFiles(files);
    };

    const {getToken} = useAuth()

    
    const [loading,setLoading] = useState<boolean>(false)
    const [content,setContent] = useState<string>('')

    const onSubmitHandler = async ()=>{
    try {
      setLoading(true)
     const formData = new FormData();
     formData.append('resume',files[0])


       const {data} = await axios.post('/api/ai/resumeReview',
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

  return (
    <div>
       <div className='h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700'>
          
      
      <div className='w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200' >
             <div className='flex items-center gap-3'>
              <Sparkles className='w-6 text-[#62e1aa]'/>
              <h1 className='text-xl font-bold'>Resume Review</h1>
             </div>
    
          <p className='mt-8 text-lg font-bold mt'>Image Upload</p>
          <div className="w-full max-w-4xl mx-auto min-h-48 border border-dashed bg-white
                     dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg my-5"
          >
              <FileUpload onChange={handleFileUpload} />
            </div>
  
            <p className='mt-8 text-sm font-medium mt'>Support PDF,PNG,JPG formats</p>

          <br />

          {
            loading ?
                     <span>
                        <LoaderOne />
                     </span>  :
                     <button 
                        className='bg-gradient-to-r from-green-400 to-blue-300 rounded-lg p-3 flex gap-3'
                        onClick={onSubmitHandler}
                     >
                     <File className='w-8'/>
                    Review Resume
                </button>
          }
         
      </div>
    
         <div className='w-full max-w-lg p-4 bg-white rounded-lg flex 
              flex-col border border-gray-200 min-h-96 max-h-[600px]'
          >
            <div className='flex items-center gap-3'>
              <File className='w-8 h-8 text-[#62e1aa]'/>
             <h1 className='text-xl font-semibold'>Analysis Results</h1>
            </div>

            {
              !content ?
                   <div className='flex-1 flex justify-center items-center'>
              <div className='text-sm flex-col items-center gap-5 text-gray-400 '>
                   <File className="w-12 mx-auto h-12"/>
                   <p>Upload your resume and click" Review Resume " to get started</p>
              </div>
            </div> :
            (
              <div className="mt-3 h-full overflow-y-scroll text-sm text-slate-600">
                <div className="reset-tw">
                  <Markdown>
                    {content}
                  </Markdown>
                </div>
              </div>
            )
            }
    
            
    
         </div>
    
        </div>
    </div>
  )
}

export default Page

