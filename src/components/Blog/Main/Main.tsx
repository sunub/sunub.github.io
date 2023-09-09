"use client"

import styles from './Main.module.css';
import HeroImage from './HeroImage';
import React from 'react';
import { Spacer } from '@/constants/Spacer';

export default function Main({ children }: { children: React.ReactNode }) {
    return (
        <div className={styles.main__content}>
            <HeroImage />
            {children}
        </div>
    );
}
