import './Cvecare.css';
import React, { useState } from 'react';
import axios from 'axios';

function UnosCvecareForma() {
  const [nazivCvecare, setNazivCvecare] = useState('');
  const [lokacija, setLokacija] = useState('');
  const [imePrezimeVlasnika, setImePrezimeVlasnika] = useState('');
  const [gradID, setGradID] = useState('');
  const [poruka, setPoruka] = useState('');

  const handleChangeNazivCvecare = (event) => {
    setNazivCvecare(event.target.value);
  };

  const handleChangeLokacija = (event) => {
    setLokacija(event.target.value);
  };

  const handleChangeImePrezimeVlasnika = (event) => {
    setImePrezimeVlasnika(event.target.value);
  };

  const handleChangeGradID = (event) => {
    setGradID(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const cvecara = {
      NazivCvecare: nazivCvecare,
      Lokacija: lokacija,
      ImePrezimeVlasnika: imePrezimeVlasnika
    };

    try {
      const response = await axios.post('https://localhost:7193/Cvecara/UnesiCvecaru/' + gradID, cvecara);
      setPoruka(response.data);
      // Ovdje možete dodati logiku za prikaz poruke o uspješnom unosu cvećare ili ažuriranju stanja na osnovu odgovora servera
    } catch (error) {
      console.error(error);
      // Ovdje možete dodati logiku za prikaz poruke o grešci ili ažuriranju stanja na osnovu greške
    }

    setNazivCvecare('');
    setLokacija('');
    setImePrezimeVlasnika('');
    setGradID('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <p>Unesi Cvecaru</p>

          <label htmlFor="nazivCvecare">Naziv cvećare:</label>
          <input
            type="text"
            id="nazivCvecare"
            name="nazivCvecare"
            value={nazivCvecare}
            onChange={handleChangeNazivCvecare}
          />
        </div>
        <div className="form-group">
          <label htmlFor="lokacija">Lokacija:</label>
          <input
            type="text"
            id="lokacija"
            name="lokacija"
            value={lokacija}
            onChange={handleChangeLokacija}
          />
        </div>
        <div className="form-group">
          <label htmlFor="imePrezimeVlasnika">Ime i prezime vlasnika:</label>
          <input
            type="text"
            id="imePrezimeVlasnika"
            name="imePrezimeVlasnika"
            value={imePrezimeVlasnika}
onChange={handleChangeImePrezimeVlasnika}
/>
</div>
<div className="form-group">
<label htmlFor="gradID">ID grada:</label>
<input
         type="number"
         id="gradID"
         name="gradID"
         value={gradID}
         onChange={handleChangeGradID}
       />
</div>
<button type="submit">Dodaj cvećaru</button>
</form>
<p>{poruka}</p>
</div>
);
}

export default UnosCvecareForma;