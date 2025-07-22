'use client'

import { FileUpload } from "@/components/ui/file-upload"
import { File,  Sparkles } from "lucide-react"
import { useState } from "react";

function page() {

  const [files, setFiles] = useState<File[]>([]);
    const handleFileUpload = (files: File[]) => {
      setFiles(files);
      console.log(files);
    };

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
          <button className='bg-gradient-to-r from-green-400 to-blue-300 rounded-lg p-3 flex gap-3'>
            <File className='w-8'/>
            Review Resume
          </button>
      </div>
    
         <div className='w-full max-w-lg p-4 bg-white rounded-lg flex 
              flex-col border border-gray-200 min-h-96 max-h-[600px]'
          >
            <div className='flex items-center gap-3'>
              <File className='w-8 h-8 text-[#62e1aa]'/>
             <h1 className='text-xl font-semibold'>Analysis Results</h1>
            </div>
    
            <div className='flex-1 flex justify-center items-center'>
              <div className='text-sm flex-col items-center gap-5 text-gray-400 '>
                   <File className="w-12 mx-auto h-12"/>
                   <p>Upload your resume and click" Review Resume " to get started</p>
              </div>
            </div>
    
         </div>
    
        </div>
    </div>
  )
}

export default page

