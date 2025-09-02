import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://sunub.vercel.app/sitemap.xml',
    host: 'https://sunub.vercel.app',
  };
}
