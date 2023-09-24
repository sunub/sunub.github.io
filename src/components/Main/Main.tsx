"use client"

import styles from './Main.module.css';
import React from 'react';

export default function Main({ children }: { children: React.ReactNode }) {
    return (
        <div id="side-ng__main-content" className={styles.main__content}>
            {children}
        </div>
    );
}
