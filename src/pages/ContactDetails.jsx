import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { AiTwotoneEdit, AiTwotoneDelete } from 'react-icons/ai';
import { TiArrowBack } from 'react-icons/ti';

import { getCurrUser, addMove } from '../store/actions/UserActions';
import {
  loadContactById,
  deleteContact,
} from '../store/actions/ContactActions';

import TransferFund from '../cmps/TransferFund';
import MoveList from '../cmps/MoveList';

export class ContactDetails extends Component {
  state = {
    contact: null,
    currUser: null,
    amount: '',
  };

  async componentDidMount() {
    this.getCurrContact();
    this.getUser();
  }

  getCurrContact = async () => {
    const id = this.props.match.params.id;
    await this.props.loadContactById(id);
    const contact = this.props.contact;
    this.setState({ contact });
  };

  getUser = async () => {
    await this.props.getCurrUser();
    const currUser = this.props.currUser;
    this.setState({ currUser });
  };

  onGoBackClickHandler = () => {
    this.props.history.go(-1);
  };

  onEditClick = () => {
    this.props.history.push(`/edit-contact/${this.state.contact._id}`);
  };

  onDeleteClick = async () => {
    await this.props.deleteContact(this.props.contact._id);
    this.props.history.push(`/contact`);
  };

  onTransferCoins = async (ev, amount) => {
    await this.props.addMove(this.state.contact, amount);
    let updatedUser = this.props.currUser;
    this.setState({ currUser: updatedUser });
  };

  render() {
    const { contact, currUser } = this.props;
    if (!contact) return <div className="contact-details">Loading... </div>;

    return (
      <div className="contact-details">
        <nav className="flex space-evenly">
          <div title="Go Back" onClick={this.onGoBackClickHandler}>
            <TiArrowBack />
          </div>
          <div title="Edit Contact" onClick={this.onEditClick}>
            <AiTwotoneEdit />
          </div>
          <div title="Delete Contact" onClick={this.onDeleteClick}>
            <AiTwotoneDelete />
          </div>
        </nav>
        <img src={`https://robohash.org/${contact.name}`} alt="Contact Icon" />
        <section className="info flex flex-column">
          <p className="name">{contact.name}</p>
          <p className="phone">{contact.phone}</p>
          <p className="email">{contact.email}</p>
        </section>
        <TransferFund
          maxCoins={currUser.coins}
          onTransferCoins={this.onTransferCoins}
          value={this.state.amount}
        />
        <section className="move-list">
          <MoveList
            contact={contact}
            title="Your Moves:"
            moveList={currUser.moves}
          />
        </section>
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
  loadContactById,
  deleteContact,
  getCurrUser,
  addMove,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ContactDetails)
);
