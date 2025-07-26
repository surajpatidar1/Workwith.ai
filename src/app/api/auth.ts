import { auth } from "@clerk/nextjs/server";
import {clerkClient} from '@clerk/clerk-sdk-node'


type UserDataType = {
  userId: string;
  plan: 'primium_plan' | 'free';
  free_usage: number;
};



 async function userData():Promise<UserDataType | undefined>{

    try {
         
        const {userId,has} = await auth();
        const hasPremium = await has({plan: 'primium_plan'})
          
         if (!userId) throw new Error("User not found");

        const user = await clerkClient.users.getUser(userId)


        let free_usage = 0
        if(!hasPremium && user.privateMetadata?.free_usage != null){
              free_usage = Number(user.privateMetadata.free_usage)
        }
        else{
            await clerkClient.users.updateUserMetadata(userId,{privateMetadata: {
                free_usage: 0
            }})
            
        }

       
               
        return   {
                           userId,
                           plan: hasPremium? 'primium_plan' : 'free',
                           free_usage
                        } ;
   
    } catch (error:any) {
        console.log("Error in middleware ",error)
       return undefined
    }

    

    

    
}

export default userData;