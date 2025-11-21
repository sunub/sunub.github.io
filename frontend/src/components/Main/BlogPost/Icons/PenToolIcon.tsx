import styled from "styled-components";

function PenToolIcon(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg
			aria-hidden="true"
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			fill="none"
			{...props}
		>
			<path
				stroke="#000"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2"
				d="M21.293 8.293a1 1 0 0 1 0 1.414l-1.586 1.586a1 1 0 0 1-1.414 0l-5.586-5.586a1 1 0 0 1 0-1.414l1.586-1.586a1 1 0 0 1 1.414 0z"
			/>
			<path
				stroke="#000"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2"
				d="M13 6 6.126 7.375a1 1 0 0 0-.776.746L2.028 20.765a1 1 0 0 0 1.207 1.207l12.644-3.322a1 1 0 0 0 .746-.776L18 11M2.3 21.7l7.286-7.286"
			/>
			<path
				stroke="#000"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2"
				d="M13 13a2 2 0 1 0-4 0 2 2 0 0 0 4 0"
			/>
		</svg>
	);
}

const MovingPen = styled(PenToolIcon)`
  offset-path: path(
    'M.5 4h5.512c2.493 0 3.244-3 5.713-3s3.244 3 5.712 3c2.469 0 3.244-3 5.713-3s3.244 3 5.712 3c2.469 0 3.244-3 5.713-3s3.244 3 5.712 3C42.756 4 43.532 1 46 1s3.244 3 5.713 3 3.244-3 5.712-3c2.469 0 3.244 3 5.713 3s3.244-3 5.712-3c2.469 0 3.244 3 5.713 3s3.244-3 5.712-3c2.469 0 3.245 3.038 5.713 3 2.398-.038 5.512-3 5.512-3'
  );
  offset-rotate: 0deg;
  animation: drawPen 4.2s ease-in-out infinite alternate;
  position: absolute;
  top: -10px;
  left: 10px;

  @keyframes drawPen {
    from {
      offset-distance: 0%;
    }
    to {
      offset-distance: 100%;
    }
  }
`;

export { MovingPen };
