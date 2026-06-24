import styled from "styled-components";

export const RootWrapper = styled.div`
  transition: all 350ms ease 0s;
  position: relative;
  z-index: 1;
  background: transparent;
  padding-top: 1rem;
`;

export const HeaderWrapper = styled.div`
  width: 100%;
  height: 60px;
  max-width: 1100px;
  max-height: 60px;

  margin-left: auto;
  margin-right: auto;
  padding-left: 32px;
  padding-right: 32px;
  z-index: 1000;

  @media (max-width: 320px) {
    padding-left: 8px;
    padding-right: 8px;
  }
`;

export const HeaderRightSideWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
  height: 100%;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
`;

export const HeaderLeftSideWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  height: 100%;

  font-size: clamp(1rem, 2vw, 1.25rem);
`;

export const HeaderLeftSideActionNav = styled.nav`
  display: flex;
  align-items: center;

  font-size: 1.25rem;
  line-height: 1;
`;

export const NavigationWrapper = styled.ul`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media screen and (max-width: 768px) {
    display: none;
    opacity: 0;
  }
`;

export const NavigationItem = styled.li`
  position: relative;
  color: var(--color-navlink);
`;

export const PostNaviation = styled.div`
  /* display: flex;
  align-items: baseline; */
`;

export const ThemeWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  @media screen and (max-width: 768px) {
    display: none;
    opacity: 0;
  }
`;
