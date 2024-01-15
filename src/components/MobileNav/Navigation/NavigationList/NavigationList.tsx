import ThemeToggler from "@/components/Theme/Toggler/ThemeToggler";
import { Category, Theme } from "type";
import * as Styled from "../Navigation.style";
import Spacer from "@/components/Spacer";

interface NavigationListProps {
  categories: Category[];
  colorTheme: Theme;
<<<<<<< HEAD
  toggleOpen: () => void;
}

function NavigationList(props: NavigationListProps) {
  const { categories, colorTheme, toggleOpen } = props;
  return (
    <Styled.Wrapper>
      <Styled.ListWrapper>
        <Item name="latest" onClick={toggleOpen} />
=======
}

function NavigationList(props: NavigationListProps) {
  const { categories, colorTheme } = props;
  return (
    <Styled.Wrapper>
      <Styled.ListWrapper>
        <Item name="latest" />
>>>>>>> refs/remotes/origin/sunub
        <Styled.List>
          posts
          <Styled.ListWrapper>
            <Spacer size={4} axis={"vertical"} />
            {categories.map((category: Category) => (
<<<<<<< HEAD
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
=======
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
>>>>>>> refs/remotes/origin/sunub
      </Styled.ThemeWrapper>
    </Styled.Wrapper>
  );
}

export default NavigationList;

<<<<<<< HEAD
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
=======
function Item({ name, ...delegated }: { name: string }) {
  return (
    <Styled.List {...delegated}>
      <Styled.Item href={`${name}`}>{name}</Styled.Item>
>>>>>>> refs/remotes/origin/sunub
    </Styled.List>
  );
}
