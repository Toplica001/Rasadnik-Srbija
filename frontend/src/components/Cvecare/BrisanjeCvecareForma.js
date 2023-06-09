import './Cvecare.css';
import React, { useState } from 'react';
import axios from 'axios';

function BrisanjeCvecareForma() {
  const [cvecaraID, setCvecaraID] = useState('');
  const [poruka, setPoruka] = useState('');

  const handleChange = (event) => {
    setCvecaraID(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const confirmed = window.confirm('Da li ste sigurni da želite da obrišete cvećaru?');

    if (confirmed) {
      try {
        const response = await axios.delete('https://localhost:7193/Cvecara/IzbrisiCvecaru/' + cvecaraID);
        setPoruka(response.data);

        // Osvežavanje stanja podataka ili prikaza na osnovu odgovora servera
        // Na primer, pozovite funkciju koja osvežava listu cvećara nakon brisanja
        // ili ponovno učitajte podatke ako se prikazuju sve cvećare na stranici

        // Primer poziva funkcije za osvežavanje liste cvećara nakon brisanja
        refreshCvecareList();
      } catch (error) {
        console.error(error);
        // Ovdje možete dodati logiku za prikaz poruke o grešci ili ažuriranju stanja na osnovu greške
      }
    }

    setCvecaraID('');
  };

  const refreshCvecareList = () => {
    // Implementirajte logiku za osvežavanje liste cvećara nakon brisanja
    // Na primer, ponovo pozovite API za dobijanje svih cvećara i ažurirajte stanje
  };

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <p>Izbriši Cvećaru</p>
          <label htmlFor="cvecaraID">ID cvećare:</label>
          <input
            type="number"
            id="cvecaraID"
            name="cvecaraID"
            value={cvecaraID}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Izbriši cvećaru</button>
      </form>
      <p>{poruka}</p>
    </div>
  );
}

export default BrisanjeCvecareForma;