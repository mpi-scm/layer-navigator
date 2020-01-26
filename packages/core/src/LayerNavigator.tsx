import React, {
  FC,
  JSXElementConstructor,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { createPortal } from 'react-dom';

import { InternalApiContext } from './InternalApiContext';
import { LayerNavigatorApiContext } from './LayerNavigatorApiContext';
import { InternalApi } from './InternalApi';
import { LayerNavigatorApi } from './LayerNavigatorApi';
import { LayerType } from './LayerType';

const genKey = (): symbol =>
  Symbol(
    Math.random()
      .toString(36)
      .slice(2)
  );

interface LayerNavigatorProps {
  /**
   * Allows to wrap layer children.
   *
   * NOT STABLE PART OF THE API YET, CAN BE CHANGED OR REMOVED ANYTIME
   * @private
   */
  layerWrappers?: JSXElementConstructor<{ children: ReactNode }>[];
}

export const LayerNavigator: FC<LayerNavigatorProps> = ({
  children,
  layerWrappers = [],
}) => {
  const [viewport, setViewport] = useState<Element>();
  const [layers, setLayers] = useState<LayerType[]>([]);

  const mountLayer: InternalApi['mountLayer'] = useCallback(
    node => (viewport ? createPortal(node, viewport) : <></>),
    [viewport]
  );

  const registerLayer: InternalApi['registerLayer'] = useCallback(opts => {
    const key = genKey();
    setLayers(v => [...v, { ...opts, key }]);
    return key;
  }, []);

  const unregisterLayer: InternalApi['unregisterLayer'] = useCallback(
    key => setLayers(v => v.filter(vv => vv.key !== key)),
    []
  );

  const updateLayerInternal: InternalApi['updateLayer'] = useCallback(
    (key, updater) =>
      setLayers(v =>
        v.map(vv => (vv.key === key ? { ...updater(vv), key } : vv))
      ),
    []
  );

  const updateLayer: LayerNavigatorApi['updateLayer'] = useCallback(
    (key, updater) =>
      setLayers(v =>
        v.map(vv =>
          vv.key === key ? { ...updater(vv), key, label: vv.label } : vv
        )
      ),
    []
  );

  const closeLastLayer: InternalApi['closeLastLayer'] = useCallback(() => {
    const prevLayer = layers[layers.length - 2];

    if (prevLayer && prevLayer.navigate) {
      prevLayer.navigate();
    }
  }, [layers]);

  const wrapLayer: InternalApi['wrapLayer'] = useCallback(
    children =>
      layerWrappers.reduce((pv, Wrapper) => <Wrapper>{pv}</Wrapper>, children),
    [layerWrappers]
  );

  const internalApi: InternalApi = useMemo(
    () => ({
      layers,
      mountLayer,
      registerViewport: setViewport,
      registerLayer,
      unregisterLayer,
      updateLayer: updateLayerInternal,
      closeLastLayer,
      wrapLayer,
    }),
    [
      layers,
      mountLayer,
      registerLayer,
      unregisterLayer,
      updateLayerInternal,
      closeLastLayer,
      wrapLayer,
    ]
  );

  const api: LayerNavigatorApi = useMemo(
    () => ({
      layers,
      closeLastLayer,
      updateLayer,
    }),
    [layers, closeLastLayer, updateLayer]
  );

  return (
    <InternalApiContext.Provider value={internalApi}>
      <LayerNavigatorApiContext.Provider value={api}>
        {children}
      </LayerNavigatorApiContext.Provider>
    </InternalApiContext.Provider>
  );
};
