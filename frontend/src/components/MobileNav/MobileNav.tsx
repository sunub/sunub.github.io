"use client";

import type { Variants } from "motion/react";
import { motion } from "motion/react";
import FocusLock from "react-focus-lock";
import { RemoveScroll } from "react-remove-scroll";
import ThemeToggler from "@/components/Theme/Toggler/ThemeTogglerButton";
import { getMoblieCloseAnimationTimeline } from "./MoblieNav.helper";
import {
	Backdrop,
	Item as ItemStyle,
	List,
	ListWrapper,
	NavigationWrapper,
	ThemeWrapper,
	Wrapper,
} from "./MoblieNav.style";

const CATEGORIES = [
	{ name: "cs", href: "/post/cs" },
	{ name: "web", href: "/post/web" },
	{ name: "code", href: "/post/code" },
	{ name: "algorithm", href: "/post/algorithm" },
];

interface RefObjects {
	pathStartRef: React.RefObject<SVGPathElement | null>;
	pathMidRef: React.RefObject<SVGPathElement | null>;
	pathEndRef: React.RefObject<SVGPathElement | null>;
	gradientRef: React.RefObject<SVGLinearGradientElement | null>;
	floodWrapperRef: React.RefObject<HTMLDivElement | null>;
}

interface Props {
	isOpen: boolean;
	toggleOpen: () => void;
	refObjects: RefObjects;
}

const containerVariants: Variants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
			delayChildren: 0.2,
		},
	},
};

const itemVariants: Variants = {
	hidden: {
		opacity: 0,
		filter: "blur(5px)",
		textShadow: "20px 0px 0px rgba(0, 0, 0, 0.5)",
	},
	visible: {
		opacity: 1,
		filter: "blur(0px)",
		textShadow: "0px 0px 0px rgba(0, 0, 0, 0)",
		transition: {
			duration: 0.95,
			ease: "easeOut",
		},
	},
};

const MotionThemeWrapper = motion.create(ThemeWrapper);
const MotionListWrapper = motion.create(ListWrapper);
const MotionList = motion.create(List);

function MobileNav(props: Props) {
	const { isOpen, toggleOpen, refObjects } = props;

	function handleClick() {
		if (!refObjects.pathStartRef.current) return;

		const closeTimeline = getMoblieCloseAnimationTimeline(refObjects);
		toggleOpen();
		closeTimeline.play();
	}

	return (
		<FocusLock>
			<RemoveScroll>
				<NavigationWrapper>
					<Wrapper $isOpen={isOpen}>
						<MotionThemeWrapper
							className="mobile-nav__link-items"
							variants={itemVariants}
							initial="hidden"
							animate="visible"
						>
							<ThemeToggler
								maskId="mobile-nav__theme-toggler"
								data-testid="mobile-theme-toggler-button"
							/>
						</MotionThemeWrapper>

						<MotionListWrapper
							id="moblie-nav__link-wrapper"
							variants={containerVariants}
							initial="hidden"
							animate="visible"
						>
							<Item name="latest" href={"/"} onClick={handleClick} />
							<Item name="posts" href="" onClick={handleClick} />
							{CATEGORIES.map(({ name, href }) => (
								<Item
									name={name}
									key={`${href}-page`}
									href={href}
									onClick={handleClick}
								/>
							))}
						</MotionListWrapper>
					</Wrapper>
				</NavigationWrapper>
				<Backdrop $isOpen={isOpen} onClick={handleClick} />
			</RemoveScroll>
		</FocusLock>
	);
}

function Item({
	name,
	href,
	onClick,
}: {
	name: string;
	href: string;
	onClick: () => void;
}) {
	return (
		<MotionList className="mobile-nav__link-items" variants={itemVariants}>
			<ItemStyle href={href} onClick={onClick}>
				{name}
			</ItemStyle>
		</MotionList>
	);
}

export default MobileNav;
