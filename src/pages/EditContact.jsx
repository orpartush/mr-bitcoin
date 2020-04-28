import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { TiArrowBack } from 'react-icons/ti';
import { AiTwotoneDelete } from 'react-icons/ai';

import {
  loadContactById,
  deleteContact,
  saveContact,
} from '../store/actions/ContactActions';

export class EditContact extends Component {
  state = {
    _id: null,
    name: '',
    phone: '',
    email: '',
    pageTitle: '',
  };

  componentDidMount() {
    this.setAddOrEdit();
  }

  setAddOrEdit = async () => {
    const contactId = this.props.match.params.id;
    if (contactId) {
      await this.props.loadContactById(contactId);
      const contact = this.props.contact;
      this.setState({ ...contact });
      this.setState({ pageTitle: 'Edit Contact' });
      return;
    }
    this.setState({ pageTitle: 'New Contact' });
  };

  onGoBackClickHandler = () => {
    this.props.history.go(-1);
  };

  onDeleteClick = async () => {
    await this.props.deleteContact(this.props.contact._id);
    this.props.history.push(`/contact`);
  };

  onChangeHandler = ev => {
    const { value, name } = ev.target;
    this.setState({ [name]: value });
  };

  onSaveContact = async ev => {
    const {_id, name, phone, email} = this.state;
    ev.preventDefault();
    await this.props.saveContact({_id, name, phone, email});
    let pushTo = '';
    if (this.state.pageTitle === 'Edit Contact') {
      pushTo = `/contact/${this.state._id}`;
      this.props.history.push(pushTo);
      return;
    }
    pushTo = `/contact`;
    this.props.history.push(pushTo);
  };

  render() {
    const { name, phone, email, _id, pageTitle } = this.state;
    const roboUrl = name === '' ? 'placeholder' : name;
    if (!_id && pageTitle === 'Edit Contact') {
      return <div className="contact-details">Loading... </div>;
    }
    const title = pageTitle;
    return (
      <div className="edit-contact">
        <nav className="flex space-between">
          <div title="Go Back" onClick={this.onGoBackClickHandler}>
            <TiArrowBack />
          </div>
          <div title="Delete Contact" onClick={this.onDeleteClick}>
            <AiTwotoneDelete />
          </div>
        </nav>
        <p className="page-title">{title}</p>
        <img src={`https://robohash.org/${roboUrl}`} alt="Contact Icon" />
        <form onSubmit={this.onSaveContact}>
          <section className="info flex flex-column space-around">
            <input
              type="text"
              name="name"
              onChange={this.onChangeHandler}
              value={name}
              placeholder="Name"
              required
            />
            <input
              type="text"
              name="phone"
              onChange={this.onChangeHandler}
              value={phone}
              placeholder="Phone"
              required
            />
            <input
              type="text"
              name="email"
              onChange={this.onChangeHandler}
              value={email}
              placeholder="Email"
              required
            />
            <button title="Save Contact">Add</button>
          </section>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    contact: state.contact.currContact,
  };
};

const mapDispatchToProps = {
  loadContactById,
  deleteContact,
  saveContact,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EditContact)
);
