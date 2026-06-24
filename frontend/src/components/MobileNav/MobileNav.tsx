"use client";

import type { Variants } from "motion/react";
import { motion } from "motion/react";
import FocusLock from "react-focus-lock";
import { RemoveScroll } from "react-remove-scroll";
import ThemeToggler from "@/components/Theme/Toggler/ThemeTogglerButton";
import { WaveAnchor } from "../ui/WaveAnchor";
import {
	Backdrop,
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
			staggerChildren: 0.05,
			delayChildren: 0.2,
		},
	},
};

const itemVariants: Variants = {
	hidden: {
		opacity: 0,
		y: 20,
	},
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.5,
			ease: "easeOut",
		},
	},
};

const MotionThemeWrapper = motion.create(ThemeWrapper);
const MotionListWrapper = motion.create(ListWrapper);
const MotionList = motion.create(List);

function MobileNav(props: Props) {
	const { isOpen, toggleOpen } = props;

	function handleClick() {
		toggleOpen();
	}

	return (
		<FocusLock>
			<RemoveScroll>
				<NavigationWrapper>
					<Wrapper>
						<MotionThemeWrapper
							className="mobile-nav__link-items"
							variants={itemVariants}
							initial="hidden"
							animate="visible"
							exit="hidden"
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
							exit="hidden"
						>
							<Item name="latest" href={"/"} onClick={handleClick} />
							<StaticItem name="posts" />
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
				<Backdrop
					className="mobile-nav__backdrop"
					aria-label="Close navigation menu"
					$isOpen={isOpen}
					onClick={handleClick}
				/>
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
			<WaveAnchor href={href} onClick={onClick}>
				{name}
			</WaveAnchor>
		</MotionList>
	);
}

function StaticItem({ name }: { name: string }) {
	return (
		<MotionList className="mobile-nav__link-items" variants={itemVariants}>
			{name}
		</MotionList>
	);
}

export default MobileNav;
