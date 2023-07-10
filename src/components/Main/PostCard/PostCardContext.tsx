'use client';

import React, { createContext, useState } from 'react';

export const PostCardContext = createContext<any>(null);

export default function PostCardCtx({ children }: { children: React.ReactNode }) {
    const [category, setCategory] = useState<string>('all');
    return <PostCardContext.Provider value={{ category, setCategory }}>{children}</PostCardContext.Provider>;
}
