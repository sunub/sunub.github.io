import type { LinkProps } from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import * as S from "./WaveAnchor.style";

export type WaveAnchorProps = Omit<
	AnchorHTMLAttributes<HTMLAnchorElement>,
	keyof LinkProps
> &
	LinkProps & {
		children: ReactNode;
	};

export function WaveAnchor({ children, ...props }: WaveAnchorProps) {
	return (
		<S.Anchor {...props}>
			<S.Label>{children}</S.Label>
			<S.WaveSlot aria-hidden="true">
				<S.WaveIcon />
			</S.WaveSlot>
		</S.Anchor>
	);
}
