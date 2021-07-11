import React, {useCallback, useEffect} from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';

import {useDispatch} from 'react-redux';

import {getData, getTransactions} from 'api/bank';
import {getValidators} from 'api/validator';
import {Layout} from 'components';
import {BANK_URL, PV_URL} from 'constants/url';
import {setNetworkStats} from 'store/app';

import Account from './Account';
import Overview from './Overview';
import Stats from './Stats';
import Transactions from './Transactions';
import Nodes from './Nodes';
import SponsorUs from './SponsorUs';
import PaymentRequest from './PaymentRequest';
import TestnetFaucet from './TestnetFaucet';
import TraceTransactions from './TraceTransactions';

function App() {
  const dispatch = useDispatch();

  const retrieveNetworkStats = useCallback(async () => {
    const stats = {
      activeBanks: (await getData(`${PV_URL}/banks?limit=1`)).count,
      activeValidators: (await getValidators(PV_URL, {limit: 1, offset: 0}))[1],
      transactions: (await getTransactions(BANK_URL, {limit: 1, offset: 0}))[1],
    };

    console.log({stats});

    dispatch(setNetworkStats(stats));
  }, [dispatch]);

  useEffect(() => {
    retrieveNetworkStats();
  }, [retrieveNetworkStats]);

  console.log('App');
  return (
    <div className="">
      <Router>
        <Layout>
          <Switch>
            {/* TNB Routes */}
            <Route exact path="/tnb/sponsor-us/" component={SponsorUs} />

            <Route exact path="/tnb/" component={Overview} />
            <Route exact path="/tnb/account/:accountNumber/" component={Account} />
            <Route exact path="/tnb/account/:accountNumber/trace-transactions" component={TraceTransactions} />

            <Route exact path="/tnb/transactions/">
              <Transactions section="transactions" />
            </Route>

            <Route exact path="/tnb/blocks">
              <Transactions section="blocks" />
            </Route>
            <Route exact path="/tnb/nodes/" component={Nodes} />

            <Route exact path="/tnb/stats/" component={Stats} />
            <Route exact path="/tnb/payment-request/" component={PaymentRequest} />

            {/* Testnet  Routes */}
            <Route exact path="/testnet/" component={Overview} />
            <Route exact path="/testnet/account/:accountNumber/" component={Account} />
            <Route exact path="/testnet/transactions/">
              <Transactions section="transactions" />
            </Route>
            <Route exact path="/testnet/blocks/">
              <Transactions section="blocks" />
            </Route>
            <Route exact path="/testnet/nodes/" component={Nodes} />
            <Route exact path="/testnet/faucet/" component={TestnetFaucet} />

            <Redirect from="/" to="/tnb/" />
          </Switch>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
