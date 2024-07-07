import { prisma } from "@/db/prisma";

async function getImage() {
  const image = await prisma.postImages.findUnique({
    where: { id: "clxtziwvf0000900l3vbbbkel" },
    select: { altText: true, blob: true, contentType: true },
  });
  return image;
}

export default async function ServerImage() {
  const imageData = await getImage();
  return <image />;
}
