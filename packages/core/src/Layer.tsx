import React, { FC, useContext, useEffect, useMemo, useState } from 'react';

import { InternalApiContext } from './InternalApiContext';
import { LayerContext } from './LayerContext';

const displayNonStyle = { display: 'none' };

interface LayerProps {
  /** Label of the layer to be used in breadcrumbs for example **/
  label: string;
  /** If true, hidden layer children will be unmounted **/
  unmountHidden?: boolean;
}

/**
 * Use this to push new layer to the layers stack.
 *
 * Layers must be nested. You must not introduce two layers as direct or indirect siblings.
 */
export const Layer: FC<LayerProps> = ({ children, label, unmountHidden }) => {
  const [key, setKey] = useState<symbol>();
  const api = useContext(InternalApiContext);

  if (!api) {
    throw new Error('You can use Layer only in LayerNavigator');
  }

  const {
    layers,
    registerLayer,
    updateLayer,
    unregisterLayer,
    mountLayer,
    wrapLayer,
  } = api;

  const isLastLayer = useMemo(
    () => layers.length > 0 && layers[layers.length - 1].key === key,
    [layers, key]
  );

  useEffect(() => {
    if (!key) {
      setKey(registerLayer({ label }));
    } else {
      updateLayer(key, v => ({ ...v, label }));
    }
  }, [registerLayer, updateLayer, label, key]);

  useEffect(
    () => () => {
      if (key) unregisterLayer(key);
    },
    [key, unregisterLayer]
  );

  const mountedLayer = useMemo(() => {
    const ml = mountLayer(
      unmountHidden && !isLastLayer ? (
        <></>
      ) : (
        <div style={isLastLayer ? undefined : displayNonStyle}>{children}</div>
      )
    );
    return wrapLayer(ml);
  }, [mountLayer, wrapLayer, unmountHidden, isLastLayer, children]);

  return (
    <LayerContext.Provider value={key}>{mountedLayer}</LayerContext.Provider>
  );
};
