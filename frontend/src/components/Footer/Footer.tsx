import { Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import GithubLogoPng from "public/assets/github-mark-white.png";
import { VisuallyHidden } from "../VisuallyHidden";
import {
	Container,
	CopyRight,
	CopyRightWrapper,
	IconsWrapper,
	Wrapper,
} from "./style";

export function Footer() {
	return (
		<Container role="contentinfo">
			<Wrapper>
				<IconsWrapper>
					<Link
						aria-label={"Link to sunub github page"}
						href={"https://github.com/sunub"}
					>
						<VisuallyHidden>
							{"sunub의 github 페이지로 이동합니다."}
						</VisuallyHidden>
						<Image src={GithubLogoPng} alt="github log" priority />
					</Link>
					<Link
						aria-label={"Send email to sunub email"}
						href={"mailto:bsc5672@gmail.com"}
					>
						<VisuallyHidden>{"sunub에게 이메일을 보냅니다."}</VisuallyHidden>
						<Mail />
					</Link>
				</IconsWrapper>
				<CopyRightWrapper>
					<CopyRight>
						© 2023-present sunub blog. Powered by Next.js, Vercel
					</CopyRight>
				</CopyRightWrapper>
			</Wrapper>
		</Container>
	);
}
