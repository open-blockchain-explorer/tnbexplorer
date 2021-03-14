import React, {FC, useState} from 'react';
import {BrowserRouter as Router, Redirect, Route, NavLink, Switch} from 'react-router-dom';

import {Layout} from 'components';

import Account from './Account';
import Overview from './Overview';
import Transactions from './Transactions';
import Nodes from './Nodes';
import SponsorUs from './SponsorUs';
import TraceTransactions from './TraceTransactions';

function App() {
  const LayoutPicker: FC = ({location, children}: any) => {
    const parentPath = location.pathname.split('/', 2)[1];
    console.log(parentPath);
    const isMainnet = parentPath !== 'testnet';
    console.log(isMainnet);

    return isMainnet ? <Layout>{children}</Layout> : <Layout type="testnet">{children}</Layout>;
  };

  return (
    <div className="">
      <Router>
        <Switch>
          <LayoutPicker>
            <Route exact path="/sponsor-us" component={SponsorUs} />

            {/* TNB Routes */}
            <Route exact path="/tnb/" component={Overview} />
            <Route exact path="/tnb/account/:accountNumber" component={Account} />
            <Route exact path="/tnb/account/:accountNumber/trace-transactions" component={TraceTransactions} />

            <Route exact path="/tnb/transactions">
              <Transactions section="transactions" />
            </Route>

            <Route exact path="/tnb/blocks">
              <Transactions section="blocks" />
            </Route>
            <Route exact path="/tnb/nodes" component={Nodes} />

            {/* Testnet  Routes */}
            <Route exact path="/testnet/">
              <Overview type="testnet" />
            </Route>
            <Route exact path="/testnet/account/:accountNumber" component={Account} />
            <Route exact path="/testnet/transactions">
              <Transactions section="transactions" type="testnet" />
            </Route>
            <Route exact path="/testnet/blocks">
              <Transactions section="blocks" type="testnet" />
            </Route>
            <Route exact path="/testnet/nodes">
              <Nodes type="testnet" />
            </Route>

            <Redirect to="/tnb/" />
          </LayoutPicker>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
