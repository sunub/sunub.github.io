
import HeroImage from "@/components/Blog/Main/HeroImage";
import PostCard from "@/components/Blog/Main/PostCard/PostCard";
import Main from "@/components/Blog/Main/index"
import LandingPage from "@/components/LandingPage";
import Post from "@/utils/post/Post";

export default function Page() {
  const post = new Post();

  return <LandingPage post={post} />
}