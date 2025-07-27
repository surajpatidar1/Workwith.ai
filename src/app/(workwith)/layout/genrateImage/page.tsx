'use client'
import { Label } from '@/components/ui/label'
import { LoaderOne } from '@/components/ui/loader'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { useAuth } from '@clerk/clerk-react'
import axios from 'axios'
import { Image as IconImage, Sparkles } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import NextImage  from 'next/image'

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
  const [publish,setPublish] = useState<boolean>(false)
  const [input,setInput] = useState<string>('')
  const [loading,setLoading] = useState<boolean>(false)
  const [content,setContent] = useState<string>('')

  const {getToken} = useAuth()

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
       setInput(e.target.value);
  }

    
  const onSubmitHandler = async (e:React.FormEvent<HTMLFormElement>)=>{
     e.preventDefault()

     try {
      setLoading(true)

     const prompt = `Highly detailed, ultra-realistic ${input}, in ${imageStyle.title}, 4K resolution, cinematic lighting, dramatic shadows, intricate textures, professional composition, studio background, trending on ArtStation`;


       const {data} = await axios.post(
                       '/api/ai/generateImage',
                        {prompt,publish},
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
    <div className='h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700'>
      
  
  <div className='w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200' >
         <div className='flex items-center gap-3'>
          <Sparkles className='w-6 text-[#ed7777]'/>
          <h1 className='text-xl font-bold'>AI Image Generator</h1>
         </div>
         <div className="grid w-full gap-3 mt-8">
           <Label  htmlFor="message">Discribe Your message</Label>
           <Textarea
              placeholder="Discribe Your message." 
               id="message"
               onChange={handleChange} />
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

      {
        loading ?
           <span>
            <LoaderOne />
           </span> :
              <button 
               className='bg-gradient-to-r from-orange-200 to-red-200 rounded-lg p-3 flex gap-3'
                onClick={(e)=>onSubmitHandler(e as any)}>
               <IconImage className='w-5'/>
                 Generate Image
                </button>
      }
      
  </div>

     <div className='w-full max-w-lg p-4 bg-white rounded-lg flex 
          flex-col border border-gray-200 min-h-96 max-h-[600px]'
      >
        <div className='flex items-center gap-3'>
          <IconImage className='w-5 h-5 text-[#ed7777]'/>
         <h1 className='text-xl '>AI Generated Image</h1>
        </div>


            {
              !content ?
              (
                      <div className='flex-1 flex justify-center items-center'>
                       <div className='text-sm flex-col items-center gap-5 text-gray-400'>
                           <IconImage/>
                         <p>Enter style and click " Generate Images " to get started</p>
                       </div>
                      </div>
              )  :
              (
                <div className="relative w-[300px] h-[300px] flex items-center justify-center mt-5">
                 <NextImage
                src={content}
                alt="AI Generated Image"
                  fill
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
