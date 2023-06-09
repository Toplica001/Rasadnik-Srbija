import React from 'react';
import './Kontakt.css';

function Kontakt() {
  return (
    <div className="kontakt">
      <h1>Kontaktirajte nas</h1>
      <div>
        <img src="https://via.placeholder.com/150" alt="Vlasnik firme" />
        <p>Ime Prezime, Vlasnik firme</p>
      </div>
      <div>
        <h2>Osnovne informacije</h2>
        <p>Naziv firme: Naziv firme d.o.o.</p>
        <p>Adresa: Ulica 123, Grad</p>
        <p>Telefon: 012 345 678</p>
        <p>Email: info@nazivfirme.com</p>
      </div>
      <div>
        <h2>O firmi</h2>
        <p>Firma Naziv firme d.o.o. osnovana je 2005. godine sa ciljem da pruži kvalitetne usluge u oblasti X.</p>
        <p>Od tada, naš tim se konstantno usavršava i razvija, a mi smo postali lideri u našoj oblasti u regionu.</p>
      </div>
    </div>
  );
}

export default Kontakt;