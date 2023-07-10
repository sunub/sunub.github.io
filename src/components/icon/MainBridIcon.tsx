'use client';

import styled from 'styled-components';
import { DayBirdIcon, NightBirdIcon } from '@/components/icon/BirdIcon';
import { LargeDayCloud, LargeNightCloud, SmallNightCloud, SmallDayCloud } from '@/components/icon/Cloud';
import { useContext } from 'react';
import { ThemeContext } from '../Theme/ThemeProvider';
import { Spacer } from '../Spacer';

const IconCotainer = styled.div`
    display: flex;
    width: 100%;
    max-width: 1100px;

    justify-content: center;
    margin-left: auto;
    margin-right: auto;
    padding-left: 32px;
    padding-right: 32px;
`;

export default function MainBirdIcon() {
    const theme = useContext(ThemeContext);

    return (
        <>
            <IconCotainer>
                <Spacer axis="horizontal" size={500} />
                {theme.colorMode === 'light' ? (
                    <>
                        <LargeDayCloud />
                        <DayBirdIcon />
                        <SmallDayCloud />
                    </>
                ) : (
                    <>
                        <LargeNightCloud />
                        <NightBirdIcon />
                        <SmallNightCloud />
                    </>
                )}
            </IconCotainer>
        </>
    );
}
