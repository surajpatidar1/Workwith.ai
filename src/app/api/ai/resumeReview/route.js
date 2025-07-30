// app/api/ai/resumeReview/route.ts
import { NextRequest, NextResponse } from "next/server";
import userData from "@/app/api/auth";
import OpenAI from "openai";
import sql from "@/app/api/dbConnect";
import { auth } from "@clerk/nextjs/server";
import connectCloudinary from "@/configCloud/cloudinary";
import pdf from 'pdf-parse/lib/pdf-parse.js'

const AI = new OpenAI({
  apiKey: process.env.GEMINI_API,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

export async function POST(req) {
  connectCloudinary();
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 401 }
      );
    }

    const formData = await req.formData();
    const resume = formData.get("resume") ;

    if (!resume) {
      return NextResponse.json(
        { error: "Please try again" },
        { status: 400 }
      );
    }

    const user = await userData();
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 401 }
      );
    }

    const { plan } = user;
    if (plan !== "primium_plan") {
      return NextResponse.json({
        success: false,
        message: "This feature is only available for premium subscriptions",
      });
    }

    if (resume.size > 5 * 1024 * 1024) {
      return NextResponse.json({
        success: false,
        message: "Resume file size exceeds allowed size (5MB).",
      });
    }


         const arrayBuffer = await resume.arrayBuffer();
         const dataBuffer = Buffer.from(arrayBuffer);
         const pdfData = await pdf(dataBuffer) 

   
    const prompt = `Review the following resume and provide constructive feedback on its strengths, weaknesses, and areas for improvement:\n\n${pdfData.text}`;

    const response = await AI.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const content = response.choices[0].message.content;

    await sql`INSERT INTO creations (user_Id, prompt, content, type) 
       VALUES (${userId}, 'Review the uploaded resume', ${content}, 'resume-review')`;

    return NextResponse.json({
      success: true,
      content: content, 
    });
  } catch (error) {
    console.error("Full Error:", error.response?.data || error.message || error);
    return NextResponse.json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
}
