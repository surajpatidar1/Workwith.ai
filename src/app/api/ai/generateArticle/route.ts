import { NextRequest, NextResponse } from "next/server";
import userData from "@/app/api/auth";
import OpenAI from "openai";
import sql from "@/app/api/dbConnect";
import clerkClient from "@clerk/clerk-sdk-node";
import { auth } from "@clerk/nextjs/server";



const AI = new OpenAI({
    apiKey: process.env.GEMINI_API,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});

        
export  async function POST(req:NextRequest ){
           
    try {
        
        const {userId} = await auth()

        if(!userId){
            return NextResponse.json({
                success:false,
                message: "User not found"
            },{status: 401});
        }
        const {prompt,length} = await req.json()
        const user = await userData()

        if(!user ){
            return NextResponse.json(
                {
                    success: false,
                    message:"User not found"},
                    {status: 401}
                )}
        const {plan,free_usage} = user

        if(plan !== 'primium_plan' && free_usage >= 10){
          return  NextResponse.json(
             {
                success: false,
                message:"Limit reached. Upgrade to continue."
            })
        }

        const response = await AI.chat.completions.create(
                         {
                            model: "gemini-2.0-flash",
                            messages: [
        
                                   {
                                    role: "user",
                                    content: prompt,
                                  },
                                      ],
                                        temperature: 0.7,
                                        max_tokens: length,
                         }
                        );

          const content = response.choices[0].message.content

          await sql`INSERT INTO creations (user_Id,prompt,content,type)
          VALUES (${userId},${prompt},${content},'article')`;

          if(plan !== 'primium_plan'){

            await clerkClient.users.updateUserMetadata(
                   userId,
                   {
                       privateMetadata:{
                                  free_usage:free_usage + 1
                                       }
                    })
          }

          return NextResponse.json({success:true,content})


    } catch (error:any) {
        console.log("Error :",error.message);
        return NextResponse.json({
            success:false,message:error.message
        });
    }
}