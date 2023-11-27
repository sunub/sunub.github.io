"use client";

import styles from "./Menu.module.css";
import Link from "next/link";
import styled from "styled-components";

const CategoryTitle = styled.span`
  font-size: 1.5rem;
  font-weight: 700;
`;

function Menu({ isOpen, setOpen, categories }) {
  const staggeredDelay = 100;
  return (
    <nav
      aria-label={"mobile header navigation"}
      className={styles[`menu-content__container`]}
    >
      {categories.map((category, columnIndex) => {
        return (
          <Link
            href={`/${category}`}
            key={crypto.randomUUID()}
            onClick={() => setOpen(!isOpen)}
            className="mobile-menu__content"
            style={{
              animationDelay: columnIndex * staggeredDelay + "ms",
            }}
          >
            <CategoryTitle>{category}</CategoryTitle>
          </Link>
        );
      })}
    </nav>
  );
}

export default Menu;
