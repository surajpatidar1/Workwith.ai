import { NextRequest, NextResponse } from "next/server";
import userData from "@/app/api/auth";
import OpenAI from "openai";
import sql from "@/app/api/dbConnect";
import { auth } from "@clerk/nextjs/server";
import axios from 'axios';
import connectCloudinary from "@/configCloud/cloudinary";
import  {v2 as cloudianry} from "cloudinary"




const AI = new OpenAI({
    apiKey: process.env.GEMINI_API,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});

        
export  async function POST(req:NextRequest ){
           
           connectCloudinary()
    try {
        
        const {userId} = await auth()
        

        if(!userId){
            return NextResponse.json({
                success:false,
                message: "User not found"
            },{status: 401});
        }
       const formData = await req.formData();
  
      const image = formData.get('image') as File ;
      const object = formData.get('object')?.toString();
      
        if (!image) {
    return NextResponse.json({ error: 'Please try again' }, { status: 400 });
  }
        const user = await userData()

        if(!user ){
            return NextResponse.json(
                {
                    success: false,
                    message:"User not found"},
                    {status: 401}
                )}
        const {plan} = user

        if(plan !== 'primium_plan' ){
          return  NextResponse.json(
             {
                success: false,
                message:"This feature is only available for premium subscriptions"
            })
        }

          const arrayBuffer = await image.arrayBuffer();
           const buffer = Buffer.from(arrayBuffer);

             

        const uploadResult: any = await new Promise((resolve, reject) => {
  cloudianry.uploader.upload_stream(
    {
      transformation: [
        {
          effect: "background_removal",
          background_removal: "remove_the_background",
        },
      ],
    },
     (error, result) => {
      if (error) return reject(error);
      resolve(result);
     }
   ).end(buffer);
  });
      
        const image_url = cloudianry.url(uploadResult.public_id, {
                  transformation: [
                   {
                  effect: `gen_remove:${object}`,
                    },
                    ],
                     resource_type: "image",
                        });

          await sql`INSERT INTO creations (user_Id,prompt,content,type)
          VALUES (${userId},${`Removed ${object} from image`},${image_url},'image'`;

          

          return NextResponse.json({success:true,content: image_url})


      } catch (error:any) {
          console.error("Full Error:", error.response?.data || error.message || error);
        return NextResponse.json({
            success:false,message:error.message
        });
      }
}