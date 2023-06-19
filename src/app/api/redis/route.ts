import { NextResponse } from "next/server";
import { blogpostRepo } from "@/lib/redis/blogpost";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const blogpost = await blogpostRepo.search().return.all();
  console.log(blogpost);
  return NextResponse.json("HI");
}

// export async function PUT(req: Request) {
//   const blogData: Description[] = await req.json();
//   const db = await blogpostRepo.search().return.all();

//   if (blogData.length !== db.length) {
//     while (blogData.length) {
//       let post = blogData.shift()!;
//       let dbData: any = db.length ? db.shift()! : "";

//       if (post["title"] !== dbData["title"]) {
//         await blogpostRepo.createAndSave(post);
//       }
//     }
//   }

//   return NextResponse.json("Loaded");
// }
export async function POST(req: Request) {
  const body = await req.json();

  blogpostRepo.createAndSave();

  return NextResponse.json("blogpost");
}
