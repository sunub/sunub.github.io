import Image from 'next/image';
import NavTop from './navtop';
import { DayBirdIcon } from '@/components/icon/BirdIcon';

export default function BookNavBar() {
    return (
        <web-book-nav>
            <div className="web-book-nav__content" aria-expanded={false}>
                <div className="mobile-header">
                    <button
                        className="icon-button material-icons tooltip color-core-text md:hidden-yes"
                        data-drawer-close-button={''}
                    />
                    <div className="mobile-header__brand">
                        <a className="site-header__brand brand">
                            <DayBirdIcon />
                        </a>
                    </div>
                </div>
                <web-navigation-drawer>
                    <NavTop />
                </web-navigation-drawer>
            </div>
        </web-book-nav>
    );
}
