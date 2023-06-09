import React, { useState } from 'react';
import axios from 'axios';

function UnosGradaForma() {
  const [IDGrada, setIDGrada] = useState('');
  const [NazivGrada, setNazivGrada] = useState('');
  const [poruka, setPoruka] = useState('');

  const handleChangeIDGrada = (event) => {
    setIDGrada(event.target.value);
  };

  const handleChangeNazivGrada = (event) => {
    setNazivGrada(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('https://localhost:7193/Grad/UnesiGrad', {
        IDGrada: parseInt(IDGrada),
        NazivGrada: NazivGrada
      });
      setPoruka(response.data);
    } catch (error) {
      console.error(error);
      setPoruka('Došlo je do greške prilikom unosa grada.');
    }

    setIDGrada('');
    setNazivGrada('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
        <p>Unos Grada</p>

          <label htmlFor="IDGrada">ID grada:</label>
          <input
            type="number"
            id="IDGrada"
            name="IDGrada"
            value={IDGrada}
            onChange={handleChangeIDGrada}
          />
        </div>
        <div className="form-group">
          <label htmlFor="NazivGrada">Naziv grada:</label>
          <input
            type="text"
            id="NazivGrada"
            name="NazivGrada"
            value={NazivGrada}
            onChange={handleChangeNazivGrada}
          />
        </div>
        <button type="submit">Unesi grad</button>
      </form>
      <p>{poruka}</p>
    </div>
  );
}

export default UnosGradaForma;