import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import { connect } from 'react-redux';
import { getCurrUser, signout } from './store/actions/UserActions';
import { getDefaultContacts } from './store/actions/ContactActions';

import Header from './cmps/layout/Header';
import ContactPage from './pages/ContactPage';
import HomePage from './pages/HomePage';
import SignUpPage from './pages/SignUpPage';
import ContactDetails from './pages/ContactDetails';
import EditContact from './pages/EditContact';
import StatisticPage from './pages/StatisticPage';

const history = createBrowserHistory();

export class App extends Component {
  state = {
    user: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.currUser !== this.props.currUser) {
      this.setState({ user: this.props.currUser });
    }
  }

  onSignout = () => {
    this.props.signout();
    this.props.getDefaultContacts();
  };

  render() {
    return (
      <Router history={history}>
        <main className="App container">
          <Header user={this.state.user} signout={this.onSignout} />
          <Route exact path="/" component={SignUpPage} />
          <Route exact path="/home/:name" component={HomePage} />
          <Route exact path="/contact" component={ContactPage} />
          <Route exact path="/contact/:id" component={ContactDetails} />
          <Route exact path="/edit-contact/:id" component={EditContact} />
          <Route exact path="/edit-contact/" component={EditContact} />
          <Route exact path="/statistic" component={StatisticPage} />
        </main>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    contact: state.contact.currContact,
    currUser: state.user.currUser,
  };
};

const mapDispatchToProps = {
  getCurrUser,
  signout,
  getDefaultContacts,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
