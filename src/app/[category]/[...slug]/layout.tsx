import { ReactNode } from "react";

export default function ContentLayout({ children }: { children: ReactNode }) {
    return (
        <div className="post">
            {children}
        </div>
    )
}