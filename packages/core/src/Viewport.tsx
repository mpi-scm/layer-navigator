import React, { FC, useCallback, useContext } from 'react';

import { InternalApiContext } from './InternalApiContext';

/**
 * Use it inside LayerNavigator to indicate where you want to render your layers.
 */
export const Viewport: FC = () => {
  const api = useContext(InternalApiContext);

  if (!api) {
    throw new Error('You can use Viewport only in LayerNavigator');
  }

  const { registerViewport } = api;

  const register = useCallback(
    (element: Element | null) => {
      if (element) {
        registerViewport(element);
      }
    },
    [registerViewport]
  );

  return <div ref={register} />;
};
