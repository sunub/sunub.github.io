import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
    },
    sitemap: "https://sunub.vercel.app/sitemap.xml",
<<<<<<< HEAD
=======
    host: "https://sunub.vercel.app",
>>>>>>> dev-v2
  };
}
