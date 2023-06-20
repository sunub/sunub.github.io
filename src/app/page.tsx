import getPost from "@/lib/getPost"
import { baseURL } from "@/lib/getBaseUrl"
import Main from "@/components/main/index"


async function getPostData() {
  const blogpost = await getPost()
  const input = {
    title: "HI",
    date: "2023-06-12",
    tags: "web",
    description: "World!",
    slug: "WHAT",
    content: "HA!"
  }

  return blogpost
}

export default async function Page({ params }: any) {
  const blogpost = await getPostData()

  return (<>
    <div id="main" aria-busy="true">
      <Main blogpost={blogpost} />
    </div>
  </>)
}