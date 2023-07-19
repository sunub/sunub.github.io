"use client"

import React, { useState, createContext, useEffect, } from "react"

export const HeaderContext = createContext("");

export default function HeaderProvider({ children }: { children: React.ReactNode }) {
    const [scrollDirection, setScrollDirection] = useState("");

    useEffect(() => {
        const body = document.querySelector('body');
        if (!body?.hasAttribute('scroll-direction')) {
            body?.setAttribute('scroll-direction', 'up')
        }

        // function caculateScrollDirection(e: Event) {
        //     const currTarget = e.target as HTMLElement;
        //     const st = window.scrollY || document.documentElement.scrollTop;
        //     const direction = st > currTarget.scrollTop ? 'down' : 'up';
        //     console.log(direction)
        //     setScrollDirection(direction);
        //     if (Math.abs(st - currTarget.scrollTop) > 0 && body) {
        //         body.setAttribute('scroll-direction', direction);
        //     }

        //     currTarget.scrollTop = st
        // }

        // window.addEventListener('scroll', caculateScrollDirection, { passive: true });

        // return window.removeEventListener('scroll', caculateScrollDirection);
    }, [])

    return (
        <HeaderContext.Provider value={scrollDirection} >
            {children}
        </HeaderContext.Provider>
    )
}