"use client";

import { Bot, Code, Cpu, Globe, type LucideIcon, Pi } from "lucide-react";
import Link from "next/link";
import {
	useCallback,
	useEffect,
	useLayoutEffect,
	useRef,
	useState,
} from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { VisuallyHidden } from "@/components/VisuallyHidden";
import { HeaderWaveUnderline } from "../HeaderWaveUnderline";

const MENU_OFFSET_Y = 12;
const MENU_CARET_HALF_WIDTH = 16;

const CATEGORY_LINKS = [
	{
		href: "/post/cs",
		label: "cs",
		screenReaderLabel: "CS 카데고리로 이동하는 링크",
		icon: Cpu,
	},
	{
		href: "/post/web",
		label: "web",
		screenReaderLabel: "Web 카데고리로 이동하는 링크",
		icon: Globe,
	},
	{
		href: "/post/code",
		label: "code",
		screenReaderLabel: "Code 카데고리로 이동하는 링크",
		icon: Code,
	},
	{
		href: "/post/algorithm",
		label: "algorithm",
		screenReaderLabel: "Algorithm 카데고리로 이동하는 링크",
		icon: Pi,
	},
	{
		href: "/post/ai",
		label: "ai",
		screenReaderLabel: "AI 카데고리로 이동하는 링크",
		icon: Bot,
	},
] as const satisfies ReadonlyArray<{
	href: string;
	label: string;
	screenReaderLabel: string;
	icon: LucideIcon;
}>;

type PortalPosition = {
	top: number;
	left: number;
	caretLeft: number;
};

function Navigation() {
	const buttonRef = useRef<HTMLButtonElement | null>(null);
	const portalRef = useRef<HTMLDivElement | null>(null);
	const [isOpen, setIsOpen] = useState(false);
	const [portalPosition, setPortalPosition] = useState<PortalPosition | null>(
		null,
	);

	const closeMenu = useCallback(() => {
		setIsOpen(false);
	}, []);

	const toggleMenu = useCallback(() => {
		setIsOpen((prev) => !prev);
	}, []);

	const syncPortalPosition = useCallback(() => {
		const button = buttonRef.current;

		if (!button) {
			return;
		}

		const rect = button.getBoundingClientRect();
		const nextPosition = {
			top: Math.round(rect.bottom + MENU_OFFSET_Y),
			left: Math.round(rect.left),
			caretLeft: Math.max(
				12,
				Math.round(rect.width / 2 - MENU_CARET_HALF_WIDTH),
			),
		};

		setPortalPosition((prev) => {
			if (
				prev &&
				prev.top === nextPosition.top &&
				prev.left === nextPosition.left &&
				prev.caretLeft === nextPosition.caretLeft
			) {
				return prev;
			}

			return nextPosition;
		});
	}, []);

	useLayoutEffect(() => {
		if (!isOpen) {
			return;
		}

		syncPortalPosition();
	}, [isOpen, syncPortalPosition]);

	useEffect(() => {
		if (!isOpen) {
			return;
		}

		function handleOutsideClick(event: MouseEvent) {
			const currentTarget = event.target;

			if (!(currentTarget instanceof Node)) {
				return;
			}

			if (buttonRef.current?.contains(currentTarget)) {
				return;
			}

			if (portalRef.current?.contains(currentTarget)) {
				return;
			}

			closeMenu();
		}

		function handleViewportChange() {
			syncPortalPosition();
		}

		window.addEventListener("click", handleOutsideClick);
		window.addEventListener("resize", handleViewportChange);
		window.addEventListener("scroll", handleViewportChange, { passive: true });

		return () => {
			window.removeEventListener("click", handleOutsideClick);
			window.removeEventListener("resize", handleViewportChange);
			window.removeEventListener("scroll", handleViewportChange);
		};
	}, [closeMenu, isOpen, syncPortalPosition]);

	const portalNode = portalRef.current;

	return (
		<NavigationWrapper id="blog-main__post-navigation">
			<TriggerWrapper>
				<Button
					type="button"
					ref={buttonRef}
					onClick={toggleMenu}
					aria-controls="post-dropdown-menu"
					aria-expanded={isOpen}
					aria-haspopup="true"
				>
					<ButtonLabel>카테고리들</ButtonLabel>
					<UnderLineWaveSlot aria-hidden="true">
						<UnderLineWaveIcon />
					</UnderLineWaveSlot>
				</Button>
			</TriggerWrapper>
			<PortalRef
				id="post-dropdown-menu"
				ref={portalRef}
				$position={portalPosition}
			/>
			{isOpen && portalNode && portalPosition
				? createPortal(<DropDownMenu closeMenu={closeMenu} />, portalNode)
				: null}
		</NavigationWrapper>
	);
}

function DropDownMenu({ closeMenu }: { closeMenu: () => void }) {
	return (
		<DropDownMenuWrapper>
			{CATEGORY_LINKS.map((item) => {
				const Icon = item.icon;

				return (
					<LinkTag key={item.href} href={item.href} onClick={closeMenu}>
						<VisuallyHidden>{item.screenReaderLabel}</VisuallyHidden>
						<Icon size={16} />
						{item.label}
					</LinkTag>
				);
			})}
		</DropDownMenuWrapper>
	);
}

const NavigationWrapper = styled.nav`
  position: relative;
  z-index: 10000;
  padding-left: 1rem;
  font-size: 1.25rem;
`;

const TriggerWrapper = styled.div`
  display: inline-flex;
  align-items: flex-end;
`;

const UnderLineWaveIcon = styled(HeaderWaveUnderline)`
  display: block;
  width: 100%;
  height: 100%;
  overflow: visible;
  stroke: var(--color-text);
  stroke-linecap: round;

  path {
    stroke-dasharray: 1;
    stroke-dashoffset: 1;
    opacity: 0.56;
    vector-effect: non-scaling-stroke;
    transition:
      stroke-dashoffset 350ms cubic-bezier(0.8, 1, 0.7, 1),
      opacity 220ms ease;
    stroke: color-mix(in oklch, var(--color-highlight) 72%, transparent);
  }
`;

const Button = styled.button`
  position: relative;
  display: inline-flex;
  align-items: flex-start;
  min-width: max-content;
  padding: 0 0 0.55rem;
  color: var(--color-text);
  line-height: 1;
  transition: color 200ms ease;

  &:is(:hover, :focus-visible, [aria-expanded="true"]) {
    color: var(--color-highlight);
  }

  &:is(:hover, :focus-visible, [aria-expanded="true"]) ${UnderLineWaveIcon} path {
    stroke-dashoffset: 0;
    opacity: 1;
  }

  &:focus-visible {
    outline: 2px solid color-mix(in oklch, var(--color-highlight), white 24%);
    outline-offset: 6px;
  }
`;

const ButtonLabel = styled.span`
  display: inline-flex;
  align-items: center;
`;

const UnderLineWaveSlot = styled.span`
  pointer-events: none;
  position: absolute;
  inset-inline: 0;
  bottom: 0;
  height: 11px;
  overflow: visible;
`;

const PortalRef = styled.div<{ $position: PortalPosition | null }>`
  position: fixed;
  z-index: 1000;
  top: ${({ $position }) => ($position ? `${$position.top}px` : "0px")};
  left: ${({ $position }) => ($position ? `${$position.left}px` : "0px")};
  --menu-caret-left: ${({ $position }) =>
		$position ? `${$position.caretLeft}px` : "24px"};
`;

const DropDownMenuWrapper = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px 32px;
  will-change: transform;
  background-color: var(--color-frontWave);
  border-radius: 1rem;
  padding: 1rem 1.5rem;
  filter: drop-shadow(0 -5.9px 2.7px oklch(21.18% 0 12 / 0.025)) drop-shadow(0 -1.2px 6.9px oklch(21.18% 0 12 / 0.025))
    drop-shadow(0 8px 14.2px oklch(21.18% 0 12 / 0.05)) drop-shadow(0 21.9px 29.2px oklch(21.18% 0 12 / 0.05))
    drop-shadow(0 49px 80px oklch(21.18% 0 12 / 0.07));

  &::before {
    position: absolute;
    top: -14px;
    left: var(--menu-caret-left);
    width: 32px;
    height: 14px;
    content: "";
    background-color: var(--color-frontWave);
    clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
  }
`;

const LinkTag = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 4px 8px;
  border-radius: 8px;
  transition: background 200ms cubic-bezier(0.165, 0.84, 0.44, 1);

  &:hover {
    background: color-mix(in oklch, var(--color-highlight), transparent 80%);
  }
`;

export default Navigation;
