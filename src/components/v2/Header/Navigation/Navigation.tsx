import Link from "next/link";
import * as Styled from "../Header.style";
import Spacer from "@/components/Spacer";

function Navigation() {
  return (
    <nav>
      <Styled.NavigationWrapper>
        <Styled.NavigationItem>
          <Link href={"/latest"}>latest</Link>
        </Styled.NavigationItem>
        <Styled.NavigationItem>
          <Styled.PostNaviation>
            <Link href={"/post"}>post</Link>
            <Spacer axis={"horizonal"} size={8} />
            <button>
              <svg
                width="15"
                height="9"
                viewBox="0 0 15 9"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.73438 1.98438L6.32019 6.59402C7.10063 7.37852 8.36978 7.38018 9.15226 6.59771L13.7656 1.9845"
                  stroke="var(--color-navlink)"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </Styled.PostNaviation>
        </Styled.NavigationItem>
        <Styled.NavigationItem>
          <Link href={"/about"}>about</Link>
        </Styled.NavigationItem>
      </Styled.NavigationWrapper>
    </nav>
  );
}

export default Navigation;
