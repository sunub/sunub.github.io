import React, { ReactNode } from 'react';
import MainBirdIcon from '@/components/icon/MainBridIcon';

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <div>
            <MainBirdIcon />
            {children}
        </div>
    )
}
