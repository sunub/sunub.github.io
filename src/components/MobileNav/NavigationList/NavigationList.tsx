import ThemeToggler from "@/components/Theme/Toggler/ThemeToggler";
import { Category, Theme } from "type";
import * as Styled from "./NavigationList.style";
import Spacer from "@/components/Spacer";
import { getMoblieCloseAnimationTimeline } from "../MoblieNav.helper";
import { RefObjects } from "../MobileNav";

const CATEGORIES = ["algorithm", "code", "cs", "web"];

interface NavigationListProps {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  refObjects: RefObjects;
}

function NavigationList(props: NavigationListProps) {
  const { isOpen, setOpen, refObjects } = props;
  const closeTimeline = getMoblieCloseAnimationTimeline(refObjects, setOpen);

  return (
    <Styled.Wrapper $isOpen={isOpen}>
      <Styled.ListWrapper>
        <Item name="latest" onClick={() => closeTimeline.play()} />
        <Styled.List>
          posts
          <Styled.ListWrapper>
            <Spacer size={4} axis={"vertical"} />
            {CATEGORIES.map((category: Category) => (
              <Item
                name={category}
                key={`${category}-page`}
                onClick={() => closeTimeline.play()}
              />
            ))}
          </Styled.ListWrapper>
        </Styled.List>
        <Item name="about" onClick={() => closeTimeline.play()} />
      </Styled.ListWrapper>

      <Styled.ThemeWrapper>
        <ThemeToggler maskId="mobile-nav__theme-toggler" />
      </Styled.ThemeWrapper>
    </Styled.Wrapper>
  );
}

export default NavigationList;

function Item({
  name,
  onClick,
  ...delegated
}: {
  name: string;
  onClick: () => void;
}) {
  return (
    <Styled.List {...delegated}>
      <Styled.Item href={`${name}`} onClick={onClick}>
        {name}
      </Styled.Item>
    </Styled.List>
  );
}
