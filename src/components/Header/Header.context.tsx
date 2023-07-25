"use client"

import React, { createContext, useState } from "react"

export const HeaderContext = createContext<any>({})

export default function HeaderProvider({ children }: { children: React.ReactNode }) {
    const [isOpen, setOpen] = useState<boolean>(false);

    return (
        <HeaderContext.Provider value={{ isOpen, setOpen }}>
            {children}
        </HeaderContext.Provider>
    )
}