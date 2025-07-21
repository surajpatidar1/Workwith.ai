 'use client'
 import Image from "next/image"
 import assert from "@/assest/assets"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import {
  
  SignUpButton,
  SignedOut,
  UserButton,
  useUser,
} from '@clerk/nextjs'


function navbar() {
  const route = useRouter();
  const {user} = useUser();
 

  return (
    
    <div className="fixed z-5 w-full backdrop-blur-2xl flex justify-between
     items-center py-3 px-4 sm:px-16 xl:px-24 cursor-pointer">
    
     
    <Image
      src={assert.logo}
      alt="Logo"
      width={10}
      height={10}
      className="w-26 cursor-pointer sm:w-32"
      onClick={()=>route.push("/")}
      />
        
        {
          user? 
          <UserButton/> :
          (
              <SignedOut>
              <SignUpButton>
                 <Button 
                    className="rounded-full cursor-pointer">
                      Get started 
                      <ArrowRight className="h-4 w-4"/>
                 </Button>
              </SignUpButton>
            </SignedOut>
            
           )
        }
    
   


    </div>
  )
}

export default navbar
