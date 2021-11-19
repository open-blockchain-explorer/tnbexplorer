import React, {FC} from 'react';
import ReactGA from 'react-ga';
import {RouterChildContext, useHistory} from 'react-router-dom';

export const GoogleAnalytics: FC<Partial<RouterChildContext>> = () => {
  const history = useHistory();
  const historyListener = () => {
    ReactGA.set({page: history.location.pathname}); // Update the user's current page
    ReactGA.pageview(history.location.pathname); // Record a pageview for the given page
  };

  if (process.env.REACT_APP_ANALYTICS_ID) {
    console.log('analytics', process.env.REACT_APP_ANALYTICS_ID);
    historyListener();
    history.listen(historyListener);
  }

  return <div />;
};
