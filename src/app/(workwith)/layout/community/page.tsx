'use client'


import { useAuth, useUser } from "@clerk/clerk-react";
import { StaticImageData } from "next/image";
import { useEffect, useState } from "react"
import Image from "next/image";
import { Heart } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { Skeleton } from "@/components/ui/skeleton";

interface data{
       id: number,
      user_id:string,
      prompt: string,
      content: StaticImageData | string,
      type: string,
      publish: boolean,
      likes: string[],
      created_at: string,
      updated_at: string,
      __v?: number,
}

function page() {

   const [ creations,setCreations] = useState<data[]>([]);
   const [loading,setLoading] = useState<boolean>(true)
   const {user} = useUser()
   const {getToken} = useAuth()

   const fetchCreations = async () =>{
    try {
           
      const {data} = await axios.get('/api/user/getPublishedcreations',{
        headers:{
          Authorization: `Bearer ${await getToken()}`
        }
      });

      if(data.success){
        setCreations(data.creations)
      }else{
        toast.error(data.message)
      }
    } catch (error:any) {
      console.log(error);
      toast.error(error.message)
    }
    setLoading(false)
   }

   const imageLikeToggle = async (id:any)=>{
     try {
          
      const {data} = await axios.post('/api/user/likeCreations',{id},{
        headers:{
          Authorization: `Bearer ${await getToken()}`
        }
      });

      if(data.success){
        toast.success(data.message)
        await fetchCreations()
      }else{
        toast.error(data.message)
      }
    } catch (error:any) {
      console.log(error);
      toast.error(error.message)
    }
    setLoading(false)
   }

   useEffect(()=>{
    if(user){
        fetchCreations()
        
    }
   
   },[user])
   useEffect(() => {
  console.log("Updated Creations:", creations);
}, [creations]);
  return (

    
    <div className='flex-1 h-full flex flex-col gap-4 p-6'>
    Creations

    {
      !creations ?

     (
      
    <div className="flex flex-col space-y-3 p-12">
              <Skeleton className="h-[300px] w-[300pxpx] rounded-xl" />
              <div className="space-y-2">
            <Skeleton className="h-12 w-[350px]" />
            <Skeleton className="h-12  w-[300px]" />
           </div>
           </div>
  


     ) :

      (

         <div className='bg-white h-full w-full rounded-xl overflow-y-scroll'>
           {
               creations?.map((item,idx)=>(
                  <div 
                    key={idx}
                    className="relative group inline-block pl-3 pt-3 w-full 
                     sm:max-w-1/2 lg:max-w-1/3"
                  >

                    <Image 
                      className="h-full w-full object-cover rounded-lg" 
                      src={item.content} 
                      alt="img" 
                      width={80} 
                      height={80}
                    />
              <div 
               className="absolute bottom-0 top-0 right-0 left-3 flex gap-2 items-end 
                     justify-end group-hover:justify-between p-3 group-hover:bg-gradient-to-b 
                     from-transparent to-black/80 text-white rounded-lg"
               >

              <p className="text-sm hidden group-hover:block">
                    {item.prompt}
             </p>
                  <div className="flex gap-1 items-center">
                      <p>{item.likes.length}</p>
                      <Heart 
                         className={`min-w-5 h-5 hover:scale-110 cursor-pointer
                           ${item.likes.includes(user?.id as string) ? "fill-red-500 text-red-600" : "text-white"}`}
                           onClick={()=>imageLikeToggle(item.id)}
                      />
                  </div>
              </div>
             <div>
             </div>
           
          </div>
      ))
     }
    </div>
      )
    }
    
    </div>
  )
}

export default page
