AI-Powered Content Platform

🚀 Tech Stack

Frontend: Next.js (App Router + TypeScript), TailwindCSS, Shadcn UI, Acertinity

Authentication: Clerk UI

Backend: TypeScript API routes

Database: Neon.tech (PostgreSQL)

AI Integrations:

Clipdrop (Article & Blog Title Generation, Remove BG, Remove Object)

Gemini (Resume Review)

Cloud: Cloudinary for image upload & delivery

✅ Features

Bill Integration

Authentication using Clerk

Beautiful UI with Shadcn + Acertinity styling

Article & Blog Title Generator powered by ClipDrop AI

Remove Background and Remove Objects from images (Clipdrop)

Resume Review using Gemini AI

Community Section to publish and explore blogs

Cloudinary for fast and reliable media hosting

📁 Folder Structure (Major Modules)

app/
  ├─ writeArticle/
  ├─ removebg/
  ├─ removeObj/
  ├─ reviewResume/
  ├─ community/
  └─ dashboard/

components/
  └─ ui/ (shadcn components)

api/
  ├─ cloudinary/
  ├─ ai/
  ├─ blog/
  └─ user/

lib/ & configCloud/ (Clerk + DB + Cloudinary configs)

🔐 Clerk Auth

Uses Clerk UI for sign in, sign up, dashboard protection.

@clerk/nextjs for auth hooks and session management.

🎨 ClipDrop AI

Article & Blog Title Generation via prompts

Remove Background endpoint

Remove Object using mask and source image

🌩️ Cloudinary Integration

Used for storing edited images

Integrated via REST upload and URL replacement

🧠 Gemini AI

Resume analysis and improvement suggestions

Integrated in reviewResume/page.tsx

🧪 Pages Summary

Route

Feature

/writeArticle

Blog title & content generation

/removebg

Image background remover

/removeObj

Object remover with mask

/reviewResume

AI resume review

/community

User blogs exploration

/dashboard

Authenticated user dashboard

📦 Deployment

Can be deployed on Vercel with .env setup

.env variables

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
DATABASE_URL=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
CLIPDROP_API_KEY=

🧑‍💻 Built by Suraj Patidar

Visit to preview :  https://workwith-ai-3p43.vercel.app/
