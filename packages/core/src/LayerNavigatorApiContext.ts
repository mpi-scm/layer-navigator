import { createContext } from 'react';

import { LayerNavigatorApi } from './LayerNavigatorApi';

export const LayerNavigatorApiContext = createContext<
  LayerNavigatorApi | undefined
>(undefined);
