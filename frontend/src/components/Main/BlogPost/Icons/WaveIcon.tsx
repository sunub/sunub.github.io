"use client";

import styled from "styled-components";

function WaveIcon({ ...props }: React.SVGProps<SVGSVGElement>) {
	return (
		<svg
			aria-hidden="true"
			xmlns="http://www.w3.org/2000/svg"
			width="93"
			height="5"
			fill="none"
			{...props}
		>
			<PATH
				id="write-pen-underline-wave"
				stroke="#484848"
				strokeWidth="2"
				pathLength="1"
				strokeLinecap="round"
				d="M.5 4h5.512c2.493 0 3.244-3 5.713-3s3.244 3 5.712 3c2.469 0 3.244-3 5.713-3s3.244 3 5.712 3c2.469 0 3.244-3 5.713-3s3.244 3 5.712 3C42.756 4 43.532 1 46 1s3.244 3 5.713 3 3.244-3 5.712-3c2.469 0 3.244 3 5.713 3s3.244-3 5.712-3c2.469 0 3.244 3 5.713 3s3.244-3 5.712-3c2.469 0 3.245 3.038 5.713 3 2.398-.038 5.512-3 5.512-3"
			/>
		</svg>
	);
}

const PATH = styled.path`
  stroke-dashoffset: 1;
  stroke-dasharray: 1;
  animation: wave 4.2s cubic-bezier(0.42, 0, 0.58, 1) infinite alternate;
  animation-delay: 0;

  @keyframes wave {
    0% {
      stroke-dashoffset: 1;
    }
    100% {
      stroke-dashoffset: 0;
    }
  }
`;

export { WaveIcon };
