import Blog from "./blog";
import * as v from "valibot";

const RedirectsSchema = v.object({
  source: v.string([v.startsWith("/")]),
  destination: v.string([v.startsWith("/")]),
  permanent: v.boolean(),
});

(async () => {})();
