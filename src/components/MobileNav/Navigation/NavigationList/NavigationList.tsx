import ThemeToggler from "@/components/Theme/Toggler/ThemeToggler";
import { Category, Theme } from "type";
import * as Styled from "../Navigation.style";
import Spacer from "@/components/Spacer";

interface NavigationListProps {
  categories: Category[];
  colorTheme: Theme;
}

function NavigationList(props: NavigationListProps) {
  const { categories, colorTheme } = props;
  return (
    <Styled.Wrapper>
      <Styled.ListWrapper>
        <Item name="latest" />
        <Styled.List>
          posts
          <Styled.ListWrapper>
            <Spacer size={4} axis={"vertical"} />
            {categories.map((category: Category) => (
              <Item name={category} key={`${category}-page`} />
            ))}
          </Styled.ListWrapper>
        </Styled.List>
        <Item name="about" />
      </Styled.ListWrapper>

      <Styled.ThemeWrapper>
        <ThemeToggler
          initColorTheme={colorTheme}
          maskId="mobile-nav__theme-toggler"
        />
      </Styled.ThemeWrapper>
    </Styled.Wrapper>
  );
}

export default NavigationList;

function Item({ name, ...delegated }: { name: string }) {
  return (
    <Styled.List {...delegated}>
      <Styled.Item href={`${name}`}>{name}</Styled.Item>
    </Styled.List>
  );
}
