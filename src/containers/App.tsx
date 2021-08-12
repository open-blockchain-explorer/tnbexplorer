import React, {useCallback, useEffect} from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';

import {useDispatch} from 'react-redux';

import {getData, getTransactions} from 'api/bank';
import {getValidators} from 'api/validator';
import {GoogleAnalytics, Layout} from 'components';
import {BANK_URL, PV_URL} from 'constants/url';
import {setNetworkStats} from 'store/app';

import Account from './Account';
import Overview from './Overview';
import Stats from './Stats';
import Transactions from './Transactions';
import Nodes from './Nodes';
import PaymentRequest from './PaymentRequest';
import RichList from './RichList';
import SponsorUs from './SponsorUs';
import TestnetFaucet from './TestnetFaucet';
import TraceTransactions from './TraceTransactions';

function App() {
  const dispatch = useDispatch();

  const retrieveNetworkStats = useCallback(async () => {
    getData(`${PV_URL}/banks?limit=1`).then((data) => {
      dispatch(
        setNetworkStats({
          activeBanks: data.count,
        }),
      );
    });

    getValidators(PV_URL, {limit: 1, offset: 0}).then(({total}) => {
      dispatch(
        setNetworkStats({
          activeValidators: total,
        }),
      );
    });

    getTransactions(BANK_URL, {limit: 1, offset: 0}).then(({total}) => {
      dispatch(
        setNetworkStats({
          transactions: total,
        }),
      );
    });
  }, [dispatch]);

  useEffect(() => {
    retrieveNetworkStats();
  }, [retrieveNetworkStats]);

  return (
    <div className="">
      <Router>
        <GoogleAnalytics />
        <Layout>
          <Switch>
            {/* TNB Routes */}
            <Route exact path="/tnb/sponsor-us/" component={SponsorUs} />

            <Route exact path="/tnb/" component={Overview} />
            <Route exact path="/tnb/account/:accountNumber/" component={Account} />
            <Route exact path="/tnb/account/:accountNumber/trace-transactions" component={TraceTransactions} />

            <Route exact path="/tnb/rich-list/" component={RichList} />

            <Route exact path="/tnb/transactions/">
              <Transactions section="transactions" />
            </Route>

            <Route exact path="/tnb/blocks">
              <Transactions section="blocks" />
            </Route>
            <Route exact path="/tnb/nodes/" component={Nodes} />
            <Route exact path="/tnb/payment-request/" component={PaymentRequest} />
            <Route exact path="/tnb/stats/" component={Stats} />

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
