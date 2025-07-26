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
        const {prompt,publish} = await req.json()
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

          const formData = new FormData()
              formData.append('prompt', prompt)
           const {data} =   await axios.post("https://clipdrop-api.co/text-to-image/v1",formData,{
                headers: {
                      'x-api-key': process.env.CLIPDROP_TEXT_TO_IMAGE,
                   },
                   responseType: "arraybuffer",
             });

             const base64Image = `data:image/png;base64,${Buffer.from(data,'binary').toString("base64")}`;

          const {secure_url} =    await cloudianry.uploader.upload(base64Image)

          await sql`INSERT INTO creations (user_Id,prompt,content,type,publish)
          VALUES (${userId},${prompt},${secure_url},'image',${publish ?? false})`;

          

          return NextResponse.json({success:true,content: secure_url})


      } catch (error:any) {
          console.error("Full Error:", error.response?.data || error.message || error);
        return NextResponse.json({
            success:false,message:error.message
        });
      }
}