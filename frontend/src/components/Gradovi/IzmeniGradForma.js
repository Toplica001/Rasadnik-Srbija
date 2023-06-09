import './Gradovi.css';
import React, { useState } from 'react';
import axios from 'axios';

function IzmeniGradForma() {
  const [gradID, setGradID] = useState('');
  const [nazivGrada, setNazivGrada] = useState('');
  const [poruka, setPoruka] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'gradID') {
      setGradID(value);
    } else if (name === 'nazivGrada') {
      setNazivGrada(value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.put(`https://localhost:7193/Grad/IzmeniGrad/${gradID}/${nazivGrada}`);
      setPoruka(response.data);
      // Ovdje možete dodati logiku za prikaz poruke o uspješnoj izmjeni grada ili ažuriranju stanja na osnovu odgovora servera
    } catch (error) {
      console.error(error);
      // Ovdje možete dodati logiku za prikaz poruke o grešci ili ažuriranju stanja na osnovu greške
    }

    setGradID('');
    setNazivGrada('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <p>Izmeni Grad</p>
          <label htmlFor="gradID">ID grada:</label>
          <input
            type="number"
            id="gradID"
            name="gradID"
            value={gradID}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="nazivGrada">Naziv grada:</label>
          <input
            type="text"
            id="nazivGrada"
            name="nazivGrada"
            value={nazivGrada}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Izmeni grad</button>
      </form>
      <p>{poruka}</p>
    </div>
  );
}

export default IzmeniGradForma;