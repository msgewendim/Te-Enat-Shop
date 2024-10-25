// useAppContext.ts
import { IContext } from '../providers/interface/context';

export const useAppContext = (): IContext => {
  const context = useAppContext();
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};