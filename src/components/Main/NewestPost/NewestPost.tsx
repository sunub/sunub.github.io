import * as Styled from "./NewestPost.style";
import Spacer from "@/components/Spacer";
import BlogPost from "../BlogPost";

function NewestPost() {
  return (
    <Styled.RootWrapper>
      <Styled.TitleWrapper>
        <FeatherIcon />
        <Styled.Title>Recently Published</Styled.Title>
      </Styled.TitleWrapper>
      <Spacer axis={"vertical"} size={64} />
      <BlogPost />
    </Styled.RootWrapper>
  );
}

export function FeatherIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" fill="none">
      <path
        fill="#181F21"
        d="M12.392 4.565a17.514 17.514 0 0 1 8.953-2.909l.707-.03.11 4.042c.013.452 0 .9-.037 1.343-1.467 1.141-2.743 2.197-3.059 2.541l.096-.032c1.084-.366 1.93-.652 2.74-1a12.455 12.455 0 0 1-1.847 4.345c-2.87 2.152-5.21 3.257-5.21 3.257l2.45-.27a13.715 13.715 0 0 1-5.266 2.582 61.875 61.875 0 0 1-1.366-.184c-.398-.058-.664-.096-.765-.094.216.21.418.395.62.562-.4.052-.804.087-1.214.105l-4.244.187-.018-.674a15.478 15.478 0 0 1 1.882-7.819l.405.596-.02-1.267a16.69 16.69 0 0 1 3.346-3.96c-.039.645.064 1.112.064 1.112s.215-.73 1.593-2.265l.08-.168Z"
      />
      <path
        fill="#181F21"
        d="M3.512 23.29c-.22-3.239 5.852-11.125 9.89-15.459-2.365 3.188-6.253 8.718-6.985 9.873-.732 1.154-2.152 4.513-1.955 5.493l-.95.092Z"
      />
      <path
        fill="#FDF3F1"
        d="M4.209 23.274C4.049 19.97 9.45 12.503 16.014 7.102c-2.646 3.314-8.834 10.38-9.657 11.577-.823 1.197-1.824 3.525-1.759 4.559l-.39.036Z"
      />
    </svg>
  );
}

export default NewestPost;
