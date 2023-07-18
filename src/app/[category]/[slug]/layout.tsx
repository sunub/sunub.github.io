import React, { ReactNode } from 'react';
import FlyingBird from '@/components/icon/FlyingBird';

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <div>
            <FlyingBird />
            {children}
        </div>
    )
}
