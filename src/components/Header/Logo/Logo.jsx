"use client";

import Elevation from "@/constants/Elevation";
import * as Icons from "../icon/Icons";
import { baseURL } from "@/utils/getBaseUrl";
import Link from "next/link";
import styled from "styled-components";

const LogoLink = styled(Link)`
	display: flex;
	align-items: center;
	justify-items: center;
	outline-offset: 4px;
`;

function Logo() {
	return (
		<Elevation
			$width={64}
			$height={64}
			$border={16}
			$usage="logo"
			$distance="long"
		>
			<LogoLink href={`${baseURL}/`}>
				<Icons.BirdLogo />
			</LogoLink>
		</Elevation>
	);
}

export default Logo;
