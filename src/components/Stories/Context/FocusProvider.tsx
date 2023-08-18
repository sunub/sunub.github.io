"use client"

import React from "react";

export const FocusingContext = React.createContext<any>(null)

export default function FocuseProvider({ barSize, children }: { barSize: number, children: React.ReactNode }) {
    const [focusState, setFocusState] = React.useState(Array.from({ length: barSize }, () => false));

    React.useEffect(() => {
        focusState[0] = true;
        setFocusState(focusState);
    }, [])

    return (
        <FocusingContext.Provider value={{ focusState, setFocusState }} >
            {children}
        </FocusingContext.Provider>
    )
}