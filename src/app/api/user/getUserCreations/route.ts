import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import sql from "../../dbConnect";

export  async function GET(req:NextRequest) {
    try {
        const {userId} = await auth()

        if(!userId){
          console.error("userId is not found :",userId)
        }
        

      const creations =   await sql `SELECT * FROM creations WHERE user_id = ${userId} ORDER BY created_at DESC`;
     
      return NextResponse.json({success:true,creations})

    } catch (error:any) {
        return NextResponse.json({success:false,message:error.message})
    }
 }