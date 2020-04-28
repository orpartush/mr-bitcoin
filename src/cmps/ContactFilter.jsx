import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ContactFilter extends Component {
  static propTypes = {
    onFilter: PropTypes.func.isRequired,
  };

  state = {
    term: '',
  };

  onChange = (ev) => {
    this.setState({ [ev.target.name]: ev.target.value });
  };

  onSubmit = () => {
    this.props.onFilter({ ...this.state });
    this.setState({ term: '' });
  };

  render() {
    return (
      <div className="contact-filter">
        <input
          type="text"
          name="term"
          placeholder="Search Contacts..."
          value={this.state.term}
          onChange={this.onChange}
        />
        <button title="Search Contact" onClick={this.onSubmit}>Search</button>
      </div>
    );
  }
}
