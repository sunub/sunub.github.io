'use client';

import styled from 'styled-components';
import { Spacer } from '@/constants/Spacer';
import Dash from '@/constants/Dash';
import Menu from "../Menu";

const Container = styled.nav`
    display: flex;

    flex-direction: column;
    align-items: center;
    background: transparent;
`;

const MenuContainer = styled.nav`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`

const HeaderLeft = () => {

    return (<>
        <Container>
            <Spacer axis='vertical' size={16} />
            <Dash />
            <MenuContainer>
                <Menu usage='web' />
                <Menu usage='code' />
                <Menu usage='cs' />
                <Menu usage='algorithm' />
            </MenuContainer>
        </Container>
    </>);
};

export default HeaderLeft;