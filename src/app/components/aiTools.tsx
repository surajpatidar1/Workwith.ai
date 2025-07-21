'use client'
import { AiToolsData } from "@/assest/assets"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useRouter } from "next/navigation"


function aiTools() {
  const route = useRouter();
  return (
    <div className="px-4 sm:px-16 xl:px-26 my-24">

       <div className="text-center">
           <h2 className="text-slate-700 text-[62px] font-semibold">Powerful AI Tools</h2>
           <p className="text-gray-500 max-w-lg mx-auto">
                   Everything you need to create, enhance, and optimize your content with cutting-edge AI technology.
           </p>
      </div>

      <div className="grid grid-cols-1 gap-6 mx-12  sm:grid-cols-2 lg:grid-cols-3  mt-10 ">
        {
          AiToolsData.map((tools,index)=>(

            <Card 
               key={index} 
               onClick={()=> route.push(tools.path)}
               className="hover:shadow-slate-600  "
            >
                  {
                    <span  
                       className="rounded-xl w-12 h-12 text-white flex justify-center items-center mx-5"
                       style={{background: `linear-gradient(to bottom, ${tools.bg.from}, ${tools.bg.to})`}}
                     >
                      <tools.Icon className="w-8 h-8"/> 
                    </span>
                     
                 }
              
               <CardContent>
               <h1 className="text-gray-600 text-2xl font-semibold">
                {tools.title}
               </h1>
               </CardContent>
               <CardContent>
               <p>
                {tools.description}
               </p>
               </CardContent>
             </Card>
          ))
          }
      </div>
    </div>
  )
}

export default aiTools
