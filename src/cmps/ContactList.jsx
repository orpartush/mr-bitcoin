import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import ContactPreview from './ContactPreview';

export class ContactList extends Component {
  static propTypes = {
    contacts: PropTypes.array.isRequired,
  };

  render() {
    return (
      <div className="contact-list">
        {this.props.contacts.map((contact) => {
          return (
            <Link to={`/contact/${contact._id}`} key={contact._id}>
              <ContactPreview 
                contact={contact} 
                onEdit={this.props.onEdit} 
                onRemove={this.props.onRemove} 
              />
            </Link>
          );
        })}
      </div>
    );
  }
}

export default withRouter(ContactList);
