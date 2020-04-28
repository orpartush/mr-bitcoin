import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { GrBitcoin } from 'react-icons/gr';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoMdClose } from 'react-icons/io';

function Header({ user, signout }) {
  const [menuOpen, setMenu] = useState('');
  let history = useHistory();

  const onSignoutClick = async () => {
    await signout();
    history.push(`/`);
    onCloseMenu()
  };

  const onHamburgerClick = () => {
    setMenu('menu-open');
  };

  const onCloseMenu = () => {
    setMenu('');
  };

  return (
    <nav className="header flex space-between align-center">
      <section className="logo">
        <Link to="/" title="Home Page" onClick={onCloseMenu}>
          Mr<span>.</span>BitC
          <GrBitcoin className="r-icon" />
          in
        </Link>
      </section>
      <section className={`nav-links ${menuOpen} flex`}>
        <Link to="/" title="Home Page" onClick={onCloseMenu}>
          Home
        </Link>
        <Link className="stats" to="/statistic" title="Statistics Page" onClick={onCloseMenu}>
          Statistics
        </Link>
        {user ? (
          <div className="flex">
            <Link to="/contact" title="Contacts Page" onClick={onCloseMenu}>
              Contacts
            </Link>
            <p className="signout" onClick={onSignoutClick}>
              Signout
            </p>
          </div>
        ) : null}
      </section>
      <GiHamburgerMenu
        className={`hamburger ${menuOpen}`}
        onClick={onHamburgerClick}
      />
      <IoMdClose
        className={`close-menu-btn ${menuOpen}`}
        onClick={onCloseMenu}
      />
    </nav>
  );
}

export default Header;
