'use client';

import styled from 'styled-components';
import Logo from './Logo';

const Container = styled.div`
    display: flex;
    flex: 1 1 0%;
    align-items: baseline;
`;

const HeaderLeft = () => {
    return (
        <Container>
            <Logo />
        </Container>
    );
};

export default HeaderLeft;
