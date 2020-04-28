import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import bitcoinImg from '../assets/img/bitcoin.png';

import { connect } from 'react-redux';
import { getCurrUser } from '../store/actions/UserActions';

export class SignUpPage extends Component {
  state = {
    name: '',
  };

  componentDidMount() {
    this.checkForUser();
  }

  checkForUser = async () => {
    await this.props.getCurrUser();
    let currUser = this.props.currUser;
    if (currUser) this.props.history.push(`/home/${currUser.name}`);
  };

  onSignUpHandler = ev => {
    ev.preventDefault();
    if (this.state.name === '') return;
    this.props.history.push(`/home/${this.state.name}`);
  };

  render() {
    return (
      <div className="signup-page flex flex-column align-center">
        <img src={bitcoinImg} alt="Bitcoin" />
        <form>
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={ev => this.setState({ name: ev.target.value })}
            placeholder="Enter your name"
          />
          <button onClick={this.onSignUpHandler}>Signup</button>
        </form>
      </div>
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
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SignUpPage)
);
