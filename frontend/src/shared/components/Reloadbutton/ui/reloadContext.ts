import { createContext } from 'react';

interface ReloadContextType {
  key: number;
  reload: () => void;
}

export const ReloadContext = createContext<ReloadContextType | null>(null);
