import styled from "styled-components";
import { CloudAnime } from "./Cloud";
import { LoadingText } from "./LoadingText";

export function LoadingAnimation({ children }: { children: React.ReactNode }) {
	return (
		<LoadingContainer>
			<CloudAnime
				id="behind-scene__cloud"
				startPosition={{
					startX: 1200,
					endX: -300,
					y: "100px",
				}}
				duration={2100}
			/>
			{children}
			<LoadingText />
			<CloudAnime
				id="front-scene__cloud"
				startPosition={{
					startX: 1500,
					endX: -100,
					y: "-20px",
				}}
				duration={2100}
			/>
		</LoadingContainer>
	);
}

const LoadingContainer = styled.div`
  grid-area: loading;

  display: grid;
  grid: [bird] 1fr / [bird] 1fr;
  gap: 2rem;

  width: 100%;
  height: 100%;

  align-items: center;
  justify-items: center;
`;
