import { motion } from "motion/react";
import styled from "styled-components";

export function LoadingText() {
	return (
		<P
			initial={{ y: 20, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			transition={{
				duration: 0.8,
				ease: [0.4, 0.0, 0.2, 1],
				delay: 0.2,
			}}
			style={{ fontSize: "1.125rem" }}
		>
			컨텐츠를 불러오는 중...
		</P>
	);
}

const P = styled(motion.p)`
  padding-top: 10rem;
  grid-area: bird;
`;
