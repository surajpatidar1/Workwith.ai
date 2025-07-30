import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import sql from "../../dbConnect";

export async function POST(req:NextRequest) {
    
    try {
        const {userId} = await auth()
        const {id} = await req.json()

        const [creations] = await sql `SELECT * FROM creations WHERE id = ${id}`

        if(!creations){
            return NextResponse.json(
                {
                    success:false,
                    message:"Creation not found "
                });

        }

        const currentLikes = creations.likes;
        const userIdStr = userId?.toString()
        let updatedLikes;
        let messages;

        if(currentLikes.includes(userIdStr)){
            updatedLikes = currentLikes.filter((user:any)=>user !== userIdStr);
            messages = 'Creations unliked'
        }
        else{
            updatedLikes = [...currentLikes,userIdStr]
            messages = 'Creations Liked'
        }

        const formattedArray = `{${updatedLikes.join('.')}}`

        await sql `UPDATE creations SET likes = ${formattedArray} :: text[] WHERE id = ${id}`

        return NextResponse.json(
                             {
                                 success:true,
                                 messages
                            });

    } catch (error:any) {
        console.log("like Error ",error);
        return NextResponse.json(error.message)
    }
}