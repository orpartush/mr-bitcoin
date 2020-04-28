import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { GrBitcoin } from 'react-icons/gr';
import { RiCurrencyLine } from 'react-icons/ri';

import { BitcoinService } from '../services/BitcoinService';
import { signup, getCurrUser } from '../store/actions/UserActions';

import MoveList from '../cmps/MoveList';

export class HomePage extends Component {
  state = {
    currUser: null,
    coinRate: null,
  };

  componentDidMount() {
    const name = this.props.match.params.name;
    this.getUser(name);
    this.getBitcoinRate();
  }

  getUser = async name => {
    await this.props.signup(name);
    const currUser = this.props.currUser;
    this.setState({ currUser });
  };

  getBitcoinRate = async () => {
    const coinRate = await BitcoinService.getRate();
    this.setState({ coinRate });
  };

  render() {
    const { currUser, coinRate } = this.state;
    if (!this.state.currUser || !this.state.coinRate)
      return <div className="loading">Loading...</div>;
    return (
      <div className="home-page flex flex-column">
        <div className="user-container flex">
          <section className="info flex flex-column justify-end">
            <h1 className="name">Hello {currUser.name}!</h1>
            <div className="flex">
              <GrBitcoin className="react-icons"/>
              <p className="coins">Coins: {currUser.coins}</p>
            </div>
            <div className="flex">
              <RiCurrencyLine className="react-icons"/>
              <p className="rate">BTC: {coinRate}</p>
            </div>
          </section>
          <img src={`https://robohash.org/${currUser.name}`} alt="User" />
        </div>
        <MoveList title="Your Last 3 Moves:" moveList={currUser.moves} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currUser: state.user.currUser,
  };
};

const mapDispatchToProps = {
  signup,
  getCurrUser,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HomePage)
);
