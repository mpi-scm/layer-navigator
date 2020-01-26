import React, { FC, ReactElement, useContext, useMemo } from 'react';
import { Route, RouteProps, useRouteMatch } from 'react-router-dom';

import { isFunction } from './utils/isFunction';
import { LayerMatchContext } from './LayerMatchContext';
import { LayerMatches } from './LayerMatches';

export const LayerRouteUpdater: FC<{ matches: LayerMatches }> = ({
  children,
  matches,
}) => {
  const match = useRouteMatch();

  const newMatches: LayerMatches | undefined = useMemo(
    () => (matches ? ([...matches, match] as LayerMatches) : undefined),
    [matches, match]
  );

  return (
    <LayerMatchContext.Provider value={newMatches}>
      {children}
    </LayerMatchContext.Provider>
  );
};

export const LayerRoute = <T extends RouteProps = RouteProps>({
  children,
  ...other
}: T): ReactElement => {
  const matches = useContext(LayerMatchContext);

  if (!matches) {
    return <Route {...other}>{children}</Route>;
  }

  return (
    <Route<T> {...(other as T)}>
      {isFunction(children) ? (
        arg => (
          <LayerRouteUpdater matches={matches}>
            {children(arg)}
          </LayerRouteUpdater>
        )
      ) : (
        <LayerRouteUpdater matches={matches}>{children}</LayerRouteUpdater>
      )}
    </Route>
  );
};
