'use client';

import React from 'react';
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
