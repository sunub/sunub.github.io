import { Github, Mail } from "lucide-react";
import { VisuallyHidden } from "../VisuallyHidden";
import {
	Container,
	CopyRight,
	CopyRightWrapper,
	IconsWrapper,
	LinkWrapper,
	Wrapper,
} from "./style";

export function Footer() {
	return (
		<Container role="contentinfo">
			<Wrapper>
				<IconsWrapper>
					<LinkWrapper
						aria-label={"Link to sunub github page"}
						href={"https://github.com/sunub"}
					>
						<VisuallyHidden>
							{"sunub의 github 페이지로 이동합니다."}
						</VisuallyHidden>
						<Github />
					</LinkWrapper>
					<LinkWrapper
						aria-label={"Send email to sunub email"}
						href={"mailto:bsc5672@gmail.com"}
					>
						<VisuallyHidden>{"sunub에게 이메일을 보냅니다."}</VisuallyHidden>
						<Mail />
					</LinkWrapper>
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
