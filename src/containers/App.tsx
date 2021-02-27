import React from 'react';
import {BrowserRouter as Router, Route, NavLink, Switch} from 'react-router-dom';

import {Layout} from 'components';

import Overview from './Overview';
import Transactions from './Transactions';
import Nodes from './Nodes';

function App() {
  return (
    <div className="">
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/" component={Overview} />
            <Route exact path="/transactions">
              <Transactions section="transactions" />
            </Route>
            <Route exact path="/blocks">
              <Transactions section="blocks" />
            </Route>
            <Route exact path="/nodes" component={Nodes} />
          </Switch>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
