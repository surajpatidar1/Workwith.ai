
import { NextRequest, NextResponse } from "next/server";
import sql from "../../dbConnect";

export async function GET(req : NextRequest) {
    try {
        
        
        const creations  = await sql `SELECT * FROM creations WHERE publish = true ORDER BY created_at DESC`;
     

        return NextResponse.json({success:true, creations});

    } catch (error:any) {
        return NextResponse.json({success:false,message: error.message})
    }
}