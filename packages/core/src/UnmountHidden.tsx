import React, { useContext, FC, useMemo } from 'react';

import { LayerContext } from './LayerContext';
import { InternalApiContext } from './InternalApiContext';

/**
 * Use it inside layer and wrap with it anything that you want to unmount when layer is hidden to improve performance.
 *
 * Be careful and do not ever wrap anything containing other layers.
 */
export const UnmountHidden: FC = ({ children }) => {
  const api = useContext(InternalApiContext);
  const currentLayerKey = useContext(LayerContext);

  if (!api) {
    throw new Error('You can use UnmountHidden only in LayerNavigator');
  }

  const { layers } = api;

  return useMemo(() => {
    const isActive =
      currentLayerKey && layers[layers.length - 1].key === currentLayerKey;

    return <>{isActive ? children : undefined}</>;
  }, [layers, currentLayerKey, children]);
};
