import React, { FC } from 'react';

import { LayerNavigator } from '@layer-navigator/core';

import { ReactRouterLayerWrapper } from './ReactRouterLayerWrapper';

const wrappers = [ReactRouterLayerWrapper];

export const ReactRouterLayerNavigator: FC = React.memo(({ children }) => (
  <LayerNavigator layerWrappers={wrappers}>{children}</LayerNavigator>
));
