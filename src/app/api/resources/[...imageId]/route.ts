import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/db/prisma";

type Params = {
  imageId: string[];
};

export async function GET(request: NextRequest, context: { params: Params }) {
  let imagePath = context.params.imageId.join("/");
  const imageId = `public/${imagePath}`;
  const image = await prisma.postImages.findUnique({
    where: { imageId: imageId },
    select: { contentType: true, blob: true, id: true },
  });

  if (!image) {
    return NextResponse.json(
      { message: "이미지를 찾지 못했습니다. " },
      {
        status: 404,
        headers: {
          "Cache-Control": "no-store",
        },
      },
    );
  }

  return new NextResponse(image.blob, {
    headers: {
      "Content-Type": image.contentType,
      "Content-Length": Buffer.byteLength(image.blob).toString(),
      "Cache-Control": "public, max-age=31536000, immutable",
      "Content-Disposition": `inline; filename="file.${image.id}"`,
    },
  });
}
