'use client'
import { Protect, useAuth } from "@clerk/clerk-react"
import { Gem, Sparkle } from "lucide-react"
import { useEffect, useState } from "react"
import CreationsItems from "@/app/components/creationsItems"
import axios from "axios"
import toast from "react-hot-toast"
import { Skeleton } from "@/components/ui/skeleton"

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

function Page() {

  const [creations,setCreations] = useState<creationData[]>([])
  const [loading,setLoading] = useState<boolean>(true)
  const {getToken} = useAuth()

  const getDashboardData = async ()=>{
      try {
        const {data} = await axios.get("/api/user/getUserCreations",{
          headers:{
            Authorization: `Bearer ${await getToken()}`
          }
        });

        if(data.success){
          setCreations(data.creations)
        }
        else{
          toast.error(data.message)
        }
      } catch (error:any) {
        toast.error(error.message)
      }

      setLoading(false)
  }

  useEffect(()=>{
    getDashboardData()
  },[])
  return (
    <div className="min-h-screen over-flow-y-scroll p-6">
      <div className="flex justify-start gap-4 flex-wrap">
        {/* Total Creations Card */}

        <div 
           className="flex justify-between items-center w-72 p-4 px-6 bg-white rounded-xl 
           border border-gray-200"
        >
          <div className="text-slate-600">
            <p className="text-sm">
              Total Creations 
              <h2 className="text-lg ">{creations.length}</h2>
            </p>
          </div>

          <div 
            className="w-10 h-10 rounded-lg bg-gradient-to-br from=[#3588F2] to-[#0BB0D7]
             text-white flex justify-center items-center"
          >
            <Sparkle className="w-5 text-white"/>
          </div>

        </div>


        <div 
           className="flex justify-between items-center w-72 p-4 px-6 bg-white rounded-xl 
           border border-gray-200"
        >
          <div className="text-slate-600">
            <p className="text-sm">
              Active Plan 
              <h2 className="text-lg font-semibold">
                <Protect plan={'Premium Plan'} fallback='Free '>Premium</Protect>
              </h2>
            </p>
          </div>

          <div 
            className="w-10 h-10 rounded-lg bg-gradient-to-br from=[#FF61C5] to-[#9E53EE]
             text-white flex justify-center items-center"
          >
            <Gem className="w-5 text-white"/>
          </div>

        </div>
      </div>
{

  loading ?  

           ( <div className="flex flex-col space-y-3 p-12">
              <Skeleton className="h-[300px] w-[300pxpx] rounded-xl" />
              <div className="space-y-2">
            <Skeleton className="h-12 w-[350px]" />
            <Skeleton className="h-12  w-[300px]" />
           </div>
           </div>
           ) : (


            <div className="space-y-3 min-h-screen overflow-y-auto">
            <p className="mt-6 mb-4">Recent Creations</p>
           {
             creations.map((item)=> <CreationsItems key={item.id} item={item} />)
            }
            </div>
            )
             

             
}
</div>
      
  )
}

export default Page
