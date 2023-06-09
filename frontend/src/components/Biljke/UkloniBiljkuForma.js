import React, { useState } from 'react';
import axios from 'axios';
import './Biljke.css';

function UkloniBiljkuForma() {
  const [biljkaID, setBiljkaID] = useState('');
  const [poruka, setPoruka] = useState('');

  const handleChange = (event) => {
    setBiljkaID(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const confirmed = window.confirm('Da li ste sigurni da želite da uklonite biljku?');

    if (confirmed) {
      try {
        const response = await axios.put(`https://localhost:7193/Biljka/UkloniBiljku/${biljkaID}`);
        setPoruka(response.data);
        // Ovdje možete dodati logiku za prikaz poruke o uspješnom uklanjanju biljke ili ažuriranju stanja na osnovu odgovora servera
      } catch (error) {
        console.error(error);
        // Ovdje možete dodati logiku za prikaz poruke o grešci ili ažuriranju stanja na osnovu greške
      }
    }

    setBiljkaID('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="form" >
      <h2>Ukloni biljku!</h2>

        <div className="biljkaunesi">
          <p>Ukloni Biljku</p>
          <label htmlFor="biljkaID">ID biljke:</label>
          <input
            type="number"
            id="biljkaID"
            value={biljkaID}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Ukloni biljku</button>
      </form>
      <p>{poruka}</p>
    </div>
  );
}

export default UkloniBiljkuForma;