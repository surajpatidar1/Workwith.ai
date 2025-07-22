'use client'
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import Image from "next/image"
import assert from "@/assest/assets"

function hero() {
    const route = useRouter()
  return (
    <div className="px-4 sm:px-20 xl:px-32 relative inline-flex 
    flex-col w-full justify-center bg-[url('/gradientBackground.png')] 
     bg-cover bg-no-repeat min-h-screen">
      

      <div className="text-center mb-6">
        <h1 className="text-3xl sm:text-5xl md:text-6xl 2xl:text-7xl
             font-bold mx-auto leading-[1.2]">
                Create amazing content <br /> with <span className="text-red-400">AI tools.</span> 
       </h1>
        <p className="mt-4 max-w-xs sm:max-w-lg 2xl:max-w-xl m-auto 
                 max-sm:text-xs text-gray-600">
              Transform your content creation with our suite of premium AI tools.
            Write articles, generate images, and enhance your workflow.
        </p>
      </div>

      <div className="flex justify-center items-center gap-5">
        <Button
          variant={"outline"}
          onClick={()=>route.push('/layout/dashboard')} 
          >
            Start creating now
        </Button>
        <Button variant={"outline"}>Watch demo</Button>
      </div>

      <div className="flex items-center gap-4 mt-8 mx-auto text-gray-600">

        <Image
           src={assert.user_group} 
           alt="group_image"
           width={100}
           height={100}
         />
         Trusted by 10k+ people.
      </div>
    </div>
  )
}

export default hero

