import { createContext, useContext } from 'react';

type ContextType = {
  user: '';
};

export const defaultSessionState = {
  user: undefined,
};

export const SessionContext = createContext<ContextType>(defaultSessionState);

export const useSession = () => useContext(SessionContext);
