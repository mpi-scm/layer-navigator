import { createContext } from 'react';

import { InternalApi } from './InternalApi';

export const InternalApiContext = createContext<InternalApi | undefined>(
  undefined
);
