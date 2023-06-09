import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

function Header() {
  const [active, setActive] = useState('');
  const location = useLocation();

  const navigateTo = (path, name) => {
    setActive(name);
    window.location.href = path;
  };

  return (
    <header className="header">
      <nav >
        <ul className="nav-list">
          <div className={`nav-link nav-link1 ${active === 'pocetna' ? 'active' : ''}`} onClick={() => navigateTo('/', 'pocetna')}>Pocetna</div>
          <div className={`nav-link nav-link1 ${active === 'onama' ? 'active' : ''}`} onClick={() => navigateTo('/onama', 'onama')}>O nama</div>
          <div className={`nav-link nav-link1 ${active === 'kontakt' ? 'active' : ''}`} onClick={() => navigateTo('/kontakt', 'kontakt')}>Kontakt</div>
          <div className={`nav-link nav-link1 ${active === 'biljke' ? 'active' : ''}`} onClick={() => navigateTo('/biljke', 'biljke')}>Biljke</div>
          <div className={`nav-link nav-link1 ${active === 'cvecare' ? 'active' : ''}`} onClick={() => navigateTo('/cvecare', 'cvecare')}>Cvecare</div>
          <div className={`nav-link nav-link1 ${active === 'korpa' ? 'active' : ''}`} onClick={() => navigateTo('/korpa', 'korpa')}>Korpa</div>
          <div className={`nav-link nav-link1 ${active === 'gradovi' ? 'active' : ''}`} onClick={() => navigateTo('/gradovi', 'gradovi')}>Gradovi</div>
          <div className={`nav-link nav-link1 ${active === 'registracija' ? 'active' : ''}`} onClick={() => navigateTo('/registracijaiulogovanje', 'registracija')}>Registracija I Ulogovanje</div>
        </ul>
      </nav>
    </header>
  );
}

export default Header;