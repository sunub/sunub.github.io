import React from "react";

interface AnimationContextType {
    state: boolean
    setter: React.Dispatch<React.SetStateAction<boolean>>
}

export const AnimationContext = React.createContext<AnimationContextType | null>(null)

export default function AnimationProvider({ children }: { children: React.ReactNode }) {
    const [isBtnPressed, setBtnStatus] = React.useState(false)

    return (
        <AnimationContext.Provider value={{ state: isBtnPressed, setter: setBtnStatus }}>
            {children}
        </AnimationContext.Provider>
    )
}