import Wrapper from "./Wrapper";
import styles from "./MobileNav.module.css";
import Menu from "./Menu";

export default function MobileNav({ children }: { children: React.ReactNode }) {
    return (
        <div id="mobile-nav" className={styles.MobileMenu}>
            <Wrapper>
                <Menu />
            </Wrapper>
        </div>
    )
}