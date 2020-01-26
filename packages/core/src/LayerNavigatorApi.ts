import { InternalApi } from './InternalApi';
import { LayerType } from './LayerType';

export type LayerNavigatorApi = Pick<
  InternalApi,
  'layers' | 'closeLastLayer'
> & {
  /**
   * Updates layer with a given key with a given updater
   *
   * NOT STABLE PART OF THE API YET, CAN BE CHANGED OR REMOVED ANYTIME
   * @private
   */
  updateLayer: (
    key: symbol,
    updater: (layer: LayerType) => Omit<LayerType, 'key' | 'label'>
  ) => void;
};
