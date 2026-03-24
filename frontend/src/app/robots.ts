import { resolveSitePathUrl, resolveSiteUrl } from "@sunub/contracts";
import type { MetadataRoute } from "next";

const siteUrl = resolveSiteUrl({ env: process.env });

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: "*",
			allow: "/",
		},
		sitemap: resolveSitePathUrl("/sitemap.xml", { env: process.env }),
		host: siteUrl,
	};
}
