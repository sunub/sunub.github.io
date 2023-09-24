'use client';

import styled from 'styled-components';
import { Spacer } from '@/constants/Spacer';
import Elevation from '@/constants/Elevation';
import Dash from '@/constants/Dash';
import * as Icons from "../icon/Icons"
import NgContent from '@/constants/NgContent';

const Container = styled.nav`
    display: flex;

    flex-direction: column;
    align-items: center;
    background: oklch(90.8% 0.046 29.64);
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
            <Elevation $size={64} $distance='mid' $usage='logo'>
                <Icons.BirdLogo />
            </Elevation>
            <Dash />
            <MenuContainer>
                <NgContent usage='web' />
                <NgContent usage='code' />
                <NgContent usage='cs' />
                <NgContent usage='algo' />
            </MenuContainer>
        </Container>
    </>);
};

export default HeaderLeft;