import './Cvecare.css';
import React, { useState } from 'react';
import axios from 'axios';

function IzmenaCvecareForma() {
  const [cvecaraID, setCvecaraID] = useState('');
  const [nazivCvecare, setNazivCvecare] = useState('');
  const [lokacija, setLokacija] = useState('');
  const [imePrezimeVlasnika, setImePrezimeVlasnika] = useState('');
  const [poruka, setPoruka] = useState('');

  const handleChangeCvecaraID = (event) => {
    setCvecaraID(event.target.value);
  };

  const handleChangeNazivCvecare = (event) => {
    setNazivCvecare(event.target.value);
  };

  const handleChangeLokacija = (event) => {
    setLokacija(event.target.value);
  };

  const handleChangeImePrezimeVlasnika = (event) => {
    setImePrezimeVlasnika(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const cvecara = {
      NazivCvecare: nazivCvecare,
      Lokacija: lokacija,
      ImePrezimeVlasnika: imePrezimeVlasnika
    };

    try {
      const response = await axios.put('https://localhost:7193/Cvecara/IzmeniCvecaru/' + cvecaraID + '/' + nazivCvecare + '/' + lokacija + '/' + imePrezimeVlasnika, cvecara);
      setPoruka(response.data);
      // Ovdje možete dodati logiku za prikaz poruke o uspješnoj izmeni cvećare ili ažuriranju stanja na osnovu odgovora servera
    } catch (error) {
      console.error(error);
      // Ovdje možete dodati logiku za prikaz poruke o grešci ili ažuriranju stanja na osnovu greške
    }

    setCvecaraID('');
    setNazivCvecare('');
    setLokacija('');
    setImePrezimeVlasnika('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <p>Izmeni Cvecaru</p>

          <label htmlFor="cvecaraID">ID cvećare:</label>
          <input
            type="number"
            id="cvecaraID"
            name="cvecaraID"
            value={cvecaraID}
            onChange={handleChangeCvecaraID}
          />
        </div>
        <div className="form-group">
          <label htmlFor="nazivCvecare">Novi naziv cvećare:</label>
          <input
            type="text"
            id="nazivCvecare"
            name="nazivCvecare"
            value={nazivCvecare}
            onChange={handleChangeNazivCvecare}
          />
        </div>
        <div className="form-group">
          <label htmlFor="lokacija">
Nova lokacija:</label>
<input
         type="text"
         id="lokacija"
         name="lokacija"
         value={lokacija}
         onChange={handleChangeLokacija}
       />
</div>
<div className="form-group">
<label htmlFor="imePrezimeVlasnika">Novo ime i prezime vlasnika:</label>
<input
         type="text"
         id="imePrezimeVlasnika"
         name="imePrezimeVlasnika"
         value={imePrezimeVlasnika}
         onChange={handleChangeImePrezimeVlasnika}
       />
</div>
<button type="submit">Izmeni cvećaru</button>
</form>
<p>{poruka}</p>
</div>
);
}

export default IzmenaCvecareForma;