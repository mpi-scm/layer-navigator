import { createContext } from 'react';

import { LayerMatches } from './LayerMatches';

export const LayerMatchContext = createContext<LayerMatches | undefined>(
  undefined
);
