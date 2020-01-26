import { ReactElement, ReactNode } from 'react';

import { LayerType } from './LayerType';

export interface InternalApi {
  layers: ReadonlyArray<LayerType>;
  mountLayer: (node: ReactNode) => ReactElement;
  registerViewport: (viewport: Element) => void;
  registerLayer: (opts: Omit<LayerType, 'key'>) => symbol;
  updateLayer: (
    key: symbol,
    updater: (layer: LayerType) => Omit<LayerType, 'key'>
  ) => void;
  unregisterLayer: (key: symbol) => void;
  closeLastLayer: () => void;
  wrapLayer: (children: ReactNode) => ReactNode;
}
