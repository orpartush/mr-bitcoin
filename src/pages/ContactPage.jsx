import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';  
import { MdPersonAdd } from 'react-icons/md';

import { loadContacts } from '../store/actions/ContactActions';

import ContactList from '../cmps/ContactList';
import ContactFilter from '../cmps/ContactFilter';

export class ContactPage extends Component {
  state = {
    contacts: [],
    isContactsExist: true,
  };

  componentDidMount() {
    this.loadContacts();
  }

  loadContacts = async (filterBy = null) => {
    await this.props.loadContacts(filterBy);
    let currContacts = this.props.contacts;
    this.setState({ contacts: currContacts });
    if (currContacts.length > 0) this.setState({ contacts: currContacts });
    else {
      this.setState({ isContactsExist: false });
      setTimeout(() => {
        this.loadContacts();
        this.setState({ isContactsExist: true });
      }, 1500);
    }
  };

  onFilterHandler = (filterBy) => {
    this.loadContacts(filterBy);
  };

  checkContacts = () => {
    return this.state.isContactsExist
      ? { display: 'none' }
      : { display: 'block' };
  };

  onAddContactClick = () => {
    this.props.history.push('/edit-contact');
  }

  render() {
    let noContactsMsg = this.checkContacts();
    return (
      <section className="contact-page">
        <div className="flex">
          <ContactFilter onFilter={this.onFilterHandler} />
          <h1 title="Add New Contact" onClick={this.onAddContactClick}><MdPersonAdd /></h1>
        </div>
        <small style={noContactsMsg}>No matching contacts</small>
        <ContactList 
          contacts={this.state.contacts}
          onEdit={this.onEditContact}   
          onRemove={this.onRemoveContact}   
        />
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    contacts: state.contact.contacts,
  };
};

const mapDispatchToProps = {
  loadContacts,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ContactPage));
