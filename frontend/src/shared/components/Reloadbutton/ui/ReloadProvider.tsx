import { useCallback, useState } from 'react';
import { ReloadContext } from './reloadContext';

interface ReloadProviderProps {
  children: React.ReactNode;
}

export function ReloadProvider({ children }: ReloadProviderProps) {
  const [key, setKey] = useState<number>(0);
  const reload = useCallback(() => {
    setKey(prev => prev + 1);
  }, [setKey]);

  return <ReloadContext.Provider value={{ key, reload }}>{children}</ReloadContext.Provider>;
}
