'use client';

import React from 'react';
import styled from 'styled-components';
import { DayBirdIcon, NightBirdIcon } from './BirdIcon';
import { LargeDayCloud, LargeNightCloud, SmallDayCloud, SmallNightCloud } from './Cloud';
import { useContext } from 'react';
import { ThemeContext } from '@/components/Theme/ThemeProvider';
import { Spacer } from '@/constants/Spacer';

const IconCotainer = styled.div`
    display: flex;
    width: 100%;
    max-width: 1100px;
    opacity: 1;

    justify-content: center;
    margin-left: auto;
    margin-right: auto;
    padding-left: 32px;
    padding-right: 32px;
    
    @media ( max-width: 768px ) {
        & {
            display: none;
            opacity: 0;
        }
    }
`;

export default function MainBirdIcon() {
    const theme = useContext(ThemeContext);

    return (
        <>
            <IconCotainer>
                <Spacer axis='horizontal' size={500} />
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
