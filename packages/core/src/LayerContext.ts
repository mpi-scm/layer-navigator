import { createContext } from 'react';

/**
 * Provides access to the nearest layer key (if any)
 */
export const LayerContext = createContext<symbol | undefined>(undefined);
