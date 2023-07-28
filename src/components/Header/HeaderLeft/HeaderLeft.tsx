'use client';

import styled from 'styled-components';
import { Spacer } from '@/components/Spacer';
import Link from 'next/link';

const Container = styled.div`
    display: flex;
    flex: 1 1 0%;
    align-items: baseline;
`;

const LogoLink = styled(Link)`
	display: flex;
	flex-direction: row;
	cursor: pointer;
	font-size: 20px;
	margin-right: 32px;
	letter-spacing: -1px;
`;


const HeaderLeft = () => {

    return (
        <Container>
            <LogoLink href={"/"}>
                <p>@</p>
                <Spacer size={8} />
                <p>sun_ub</p>
            </LogoLink>
        </Container>
    );
};

export default HeaderLeft;
