import { useContext } from 'react';

import { LayerNavigatorApi } from './LayerNavigatorApi';
import { LayerNavigatorApiContext } from './LayerNavigatorApiContext';

export const useLayerNavigator = (): LayerNavigatorApi => {
  const api = useContext(LayerNavigatorApiContext);

  if (!api) {
    throw new Error('You can use LayerNavigatorApi only in LayerNavigator');
  }

  return api;
};
