import React from 'react';
import PropTypes from 'prop-types';
import { BsFillInfoSquareFill } from 'react-icons/bs';

function ContactPreview(props) {
  const { name, phone } = props.contact;

  return (
    <div className="contact-preview flex align-center">
      <img src={`https://robohash.org/${name}`} alt="Contact Icon" />
      <section className="info flex flex-column justify-center">
        <p className="name">{name}</p>
        <p className="phone">{phone}</p>
      </section>
      <p className="info-icon"><BsFillInfoSquareFill/></p>
    </div>
  );
}

ContactPreview.propTypes = {
  contact: PropTypes.object.isRequired,
};

export default ContactPreview;
