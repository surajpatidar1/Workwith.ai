 'use client'
import { LoaderFive } from "@/components/ui/loader";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import { Edit , Sparkles } from 'lucide-react'
import { useState } from "react";
import toast from "react-hot-toast";
import Markdown from "react-markdown";
function page() {


   const placeholders = [
    "Select a title -  'General'",
    "Select a title - 'Technology'",
    "Select a title  - 'Bussiness'",
    "Select a title  - 'Health'",
    "Select a title  - 'Lifestyle'",
    "Select a title  - 'Education'",
    "Select a title  - 'Travel'",
    "Select a title  - 'Food'",
  ];


  interface category{
    title:string
  }

  const Category:category[]= [
   {title: "General"},
   {title: "Technology"},
   {title: "Bussiness"},
   {title: "Health"},
   {title: "Lifestyle"},
   {title: "Education"},
   {title: "Travel"},
   {title: "Food"},

  ]


      const [category,setCategory] = useState(Category[0])
      const [input,setInput] = useState<string>('')
      const [loading,setLoading] = useState<boolean>(false)
      const [content,setContent] = useState<string>("")

      const {getToken} = useAuth()

      
   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
       setInput(e.target.value);
      
     };
     const onSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
       e.preventDefault();
       try {
        
        setLoading(true)
      


        const prompt = `Generate a blog title for the keyword ${input} in the category ${category.title}`
  
        const {data} = await axios.post(
                           '/api/ai/generateBlog',
                           {prompt},
                           {
                            headers:{
                                 Authorization:`Bearer ${await getToken()}`
                                   }}
                          );

                          if(data.success){
                                       console.log("Response:", data);

                            setContent(data.message)
                           
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
          <Sparkles className='w-6 text-[#c78ce0]'/>
          <h1 className='text-xl font-bold'>AI Title Generator</h1>
         </div>
         <p className='mt-6 text-sm font-bold mb-5'>Keyword</p>

         
        <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={onSubmit}
        
      />

      <p className='mt-8 text-sm font-medium mt'>Category</p>

      <div className='mt-3 flex gap-3 flex-wrap sm:max-w-9/11'>
        {
          Category.map((item,idx)=>(
                 <span
              className={`text-xs px-4 py-1 border rounded-full cursor-pointer ${category.title == item.title ?  'bg-blue-50 text-blue-700' : 'text-gray-500 border-gray-300 '} `}
              key={idx}
              onClick={()=>setCategory(item)}
            >
               {item.title}
            </span>
          ))
        }
      </div>
      <br />

      {
        loading ? 
                 <span >
                    <LoaderFive text="Generating Blog Title..." />
                  </span>
                  :
                   (
                          <button 
                             className='bg-gradient-to-r from-yellow-200 to-purple-400 rounded-lg p-3 flex gap-5'
                              onClick={(e) => onSubmit(e as any)}>
                          <Edit className='w-5'/>
                          Generate title
                          </button>
                   )
      }
      
  </div>

     <div className='w-full max-w-lg p-4 bg-white rounded-lg flex 
          flex-col border border-gray-200 min-h-96 max-h-[600px]'
      >
        <div className='flex items-center  gap-3'>
          <span className='w-5 h-5 text-[#c78ce0] text-4xl font-semibold flex items-center '>#</span>
         <h1 className='text-xl font-bold'>Generated Titles</h1>
        </div>
           

           {
            !content ?
              (
                 <div className='flex-1 flex justify-center items-center'>
                    <div className='text-sm flex-col items-center gap-5 text-gray-400 '>
                     <span className='w-5 h-5 text-5xl text-center mx-auto'> # </span>
                    <p>Enter keywords and click " Generate Titles " to get started</p>
                    </div>
                 </div>
              ) :
              (
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
