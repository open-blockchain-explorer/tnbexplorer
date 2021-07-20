import React, {FC} from 'react';
import ReactGA from 'react-ga';
import {RouterChildContext, useHistory} from 'react-router-dom';

export const GoogleAnalytics: FC<Partial<RouterChildContext>> = ({router}) => {
  const history = useHistory();
  const historyListener = () => {
    console.log('Google analytics ');
    ReactGA.set({page: history.location.pathname}); // Update the user's current page
    ReactGA.pageview(history.location.pathname); // Record a pageview for the given page
  };

  historyListener();
  history.listen(historyListener);

  return <div />;
};
