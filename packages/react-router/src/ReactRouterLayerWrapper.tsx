import React, { FC, useContext, useMemo, useEffect } from 'react';
import { useRouteMatch, matchPath, useHistory } from 'react-router-dom';
import { LayerContext, useLayerNavigator } from '@layer-navigator/core';

import { usePrevious } from 'utils/usePrevious';
import { isEqualMatch } from 'utils/isEqualMatch';
import { LayerMatchContext } from './LayerMatchContext';
import { LayerMatches } from './LayerMatches';

export const ReactRouterLayerWrapper: FC = ({ children }) => {
  const key = useContext(LayerContext);

  const { layers, updateLayer } = useLayerNavigator();

  const { push } = useHistory();
  const match = useRouteMatch();
  const { path } = match;
  // TODO: Remove when fixed:
  // https://github.com/ReactTraining/react-router/issues/7059
  const prevMatch = usePrevious(match);

  const prevLayerMatches = useContext(LayerMatchContext);

  const prevLayer = useMemo(() => {
    if (!key) {
      return layers.length > 0 ? layers[layers.length - 1] : undefined;
    } else {
      return layers[layers.findIndex(v => v.key === key) - 1];
    }
  }, [layers, key]);
  const prevLayerKey = useMemo(() => prevLayer?.key, [prevLayer]);
  const prevLayerFirstMatch = useMemo(
    () => (prevLayerMatches ? prevLayerMatches[0] : undefined),
    [prevLayerMatches]
  );
  const prevLayerLastMatch = useMemo(
    () =>
      prevLayerMatches
        ?.reverse()
        .find(v => matchPath(v.url, { path }) === null),
    [path, prevLayerMatches]
  );

  useEffect(() => {
    if (key && (!prevMatch || !isEqualMatch(match, prevMatch))) {
      updateLayer(key, v => ({ ...v, match }));
    }
  }, [updateLayer, match, prevMatch, key]);

  useEffect(() => {
    if (prevLayerKey && prevLayerLastMatch)
      updateLayer(prevLayerKey, v => ({
        ...v,
        navigate: () => push(prevLayerLastMatch.url),
      }));

    return () => {
      if (prevLayerKey && prevLayerFirstMatch)
        updateLayer(prevLayerKey, v => ({
          ...v,
          navigate: () => push(prevLayerFirstMatch.url),
        }));
    };
  }, [
    prevLayerLastMatch,
    prevLayerKey,
    prevLayerFirstMatch,
    updateLayer,
    push,
  ]);

  const matches: LayerMatches = useMemo(() => [match], [match]);

  return (
    <LayerMatchContext.Provider value={matches}>
      {children}
    </LayerMatchContext.Provider>
  );
};
