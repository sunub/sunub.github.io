import ThemeToggler from "@/components/Theme/Toggler/ThemeToggler";
import { Category, Theme } from "type";
import * as Styled from "../Navigation.style";
import Spacer from "@/components/Spacer";

const CATEGORIES = ["algorithm", "code", "cs", "web"];

interface NavigationListProps {
  toggleOpen: () => void;
}

function NavigationList(props: NavigationListProps) {
  const { toggleOpen } = props;
  return (
    <Styled.Wrapper>
      <Styled.ListWrapper>
        <Item name="latest" onClick={toggleOpen} />
        <Styled.List>
          posts
          <Styled.ListWrapper>
            <Spacer size={4} axis={"vertical"} />
            {CATEGORIES.map((category: Category) => (
              <Item
                name={category}
                key={`${category}-page`}
                onClick={toggleOpen}
              />
            ))}
          </Styled.ListWrapper>
        </Styled.List>
        <Item name="about" onClick={toggleOpen} />
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
