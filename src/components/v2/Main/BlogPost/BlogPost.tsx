import Spacer from "@/components/Spacer";
import Post from "@/utils/Post";

async function getFrontMatterList() {
  const post = new Post();
  const frontMatterList = await post.frontMatters["all"];
  return frontMatterList;
}

async function BlogPost() {
  const frontMatterList = await getFrontMatterList();
  const recentlyPublished = frontMatterList.slice(0, 10);

  return (
    <>
      {/* {recentlyPublished && (

    )} */}
      <div>
        <h2>{recentlyPublished[0].title}</h2>
        <p>{recentlyPublished[0].summary}</p>
      </div>
      <Spacer axis={"vertical"} size={48} />
      <div>
        <h2>{recentlyPublished[1].title}</h2>
        <p>{recentlyPublished[1].summary}</p>
      </div>
      <Spacer axis={"vertical"} size={48} />
    </>
  );
}

export default BlogPost;
