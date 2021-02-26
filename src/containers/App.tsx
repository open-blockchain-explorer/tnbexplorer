import React from 'react';
import {BrowserRouter as Router, Route, NavLink, Switch} from 'react-router-dom';

import {Layout} from 'components';

import Overview from './Overview';
import Transactions from './Transactions';

function App() {
  return (
    <div className="">
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/" component={Overview} />
            <Route exact path="/transactions" component={Transactions} />
          </Switch>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
