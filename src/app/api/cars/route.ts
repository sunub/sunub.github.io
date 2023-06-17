import { createCar } from "@/lib/redis";
import { NextResponse } from "next/server";

export const dynamic = "force-static";

export async function POST(request: Request) {
  const res = await request.json();
  const id = await createCar(JSON.stringify(res));

  return NextResponse.json(id);
}
