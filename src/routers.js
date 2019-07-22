import React from 'react';
import {
  Router,
  Route,
  Switch
} from 'react-router-dom';
import App from 'containers/App/App';
import HomePage from 'containers/Home/Home';
import DetailsPage from 'containers/Details/Details';
import history from  'helpers/history';

export default class Routers extends React.Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <App>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/:id" component={DetailsPage} />
          </App>
        </Switch>
      </Router>
    );
  }
}
