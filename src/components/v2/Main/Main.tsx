import Categories from "./Cateogries";
import * as Styled from "./Main.style";
import Post from "@/utils/Post";
import NewestPost from "./NewestPost";
import Tags from "./Tags/Tags";
import Wave from "./Wave";
import LightWave from "./Wave/LightWave";
import DarkWave from "./Wave/DarkWave";

async function getFrontMatterList() {
  const post = new Post();
  const tags = post.tags;
  const categories = post.categories;
  const frontMatterList = await post.frontMatters["all"];
  return { frontMatterList, tags, categories };
}

async function Main() {
  const { frontMatterList, tags, categories } = await getFrontMatterList();
  const mostMetionedTags = [...tags.keys()].slice(0, 6);
  const recentlyPublished = frontMatterList.slice(0, 15);

  return (
    <Styled.Wrapper>
      <NewestPost recentlyPublished={recentlyPublished} />
      <Styled.RightSideWrapper>
        <Categories categories={categories} />
        <Tags tags={mostMetionedTags} />
      </Styled.RightSideWrapper>
    </Styled.Wrapper>
  );
}
export function FeatherIcon() {
  return (
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_15_414)">
        <path
          d="M12.3916 4.56478C14.9518 2.86036 18.0228 1.80236 21.3451 1.65648L22.0524 1.62543L22.1627 5.66773C22.175 6.12046 22.1621 6.5687 22.1251 7.0112C20.6581 8.15206 19.382 9.2084 19.0663 9.55219L19.1619 9.51992C20.246 9.15408 21.0928 8.8683 21.9026 8.52019C21.57 10.0851 20.9342 11.5539 20.0552 12.8652C17.1847 15.017 14.845 16.1224 14.845 16.1224L17.2955 15.8522C15.7843 17.0546 13.9935 17.9511 12.0286 18.4339C11.4822 18.3673 11.0194 18.3009 10.6629 18.2497L10.6627 18.2497L10.6624 18.2496C10.2647 18.1925 9.99933 18.1544 9.89783 18.1563C10.1137 18.3668 10.3165 18.5513 10.5183 18.7175C10.1189 18.7699 9.71379 18.8055 9.30386 18.8235L5.06037 19.0098L5.04199 18.3361C4.96549 15.5327 5.65312 12.8649 6.92436 10.5174L7.32942 11.1129L7.30938 9.84551C8.20397 8.36762 9.33565 7.03134 10.6555 5.88671C10.6162 6.53099 10.7194 6.99836 10.7194 6.99836C10.7194 6.99836 10.934 6.26867 12.3122 4.7328C12.339 4.67579 12.3655 4.61979 12.3916 4.56478Z"
          fill="#181F21"
        />
        <path
          d="M3.51241 23.2892C3.2914 20.0512 9.36442 12.1653 13.4023 7.83148C11.0366 11.0191 7.1486 16.5495 6.41676 17.7036C5.68491 18.8577 4.26475 22.2168 4.46201 23.1971L3.51241 23.2892Z"
          fill="#181F21"
        />
        <path
          d="M4.20854 23.2741C4.04864 19.9698 9.45052 12.503 16.0141 7.10211C13.368 10.4161 7.17956 17.4822 6.3568 18.6792C5.53404 19.8761 4.53265 22.2042 4.59806 23.2376L4.20854 23.2741Z"
          fill="#FDF3F1"
        />
      </g>
      <defs>
        <clipPath id="clip0_15_414">
          <rect
            width="24"
            height="24"
            fill="white"
            transform="translate(0 0.5)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}

export default Main;
