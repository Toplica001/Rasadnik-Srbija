import React, { useState } from 'react';
import axios from 'axios';
import './Biljke.css';

function IzmeniBiljkuForma() {
  const [biljkaID, setBiljkaID] = useState('');
  const [biljka, setBiljka] = useState({
    Naziv: '',
    SlikaBiljke: '',
    Cena: '',
    KolicinaNaStanju: '',
    Deklaracija: '',
  });
  const [poruka, setPoruka] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'biljkaID') {
      setBiljkaID(value);
    } else {
      setBiljka((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.put(`https://localhost:7193/Biljka/IzmeniBiljku/${biljkaID}`, biljka);
     
      setPoruka(response.data);
      // Ovdje možete dodati logiku za prikaz poruke o uspješnoj izmeni biljke ili ažuriranju stanja na osnovu odgovora servera
    } catch (error) {
      console.error(error);
      // Ovdje možete dodati logiku za prikaz poruke o grešci ili ažuriranju stanja na osnovu greške
    }

    setBiljkaID('');
    setBiljka({
      Naziv: '',
      SlikaBiljke: '',
      Cena: '',
      KolicinaNaStanju: '',
      Deklaracija: '',
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="form">
      <h2>Izmeni biljku!</h2>

        <div className="biljkaunesi">
          <p>Izmeni Biljku</p>
          <label htmlFor="biljkaID">ID biljke:</label>
          <input
            type="number"
            id="biljkaID"
            name="biljkaID"
            value={biljkaID}
            onChange={handleChange}
          />
        </div>
        <div className="biljkaunesi">
          <label htmlFor="Naziv">Naziv:</label>
          <input
            type="text"
            id="Naziv"
            name="Naziv"
            value={biljka.Naziv}
            onChange={handleChange}
          />
        </div>
        <div className="biljkaunesi">
          <label htmlFor="SlikaBiljke">Slika biljke:</label>
          <input
            type="text"
            id="SlikaBiljke"
            name="SlikaBiljke"
            value={biljka.SlikaBiljke}
            onChange={handleChange}
          />
        </div>
        <div className="biljkaunesi">
          <label htmlFor="Cena">Cena:</label>
          <input
            type="number"
            id="Cena"
            name="Cena"
            value={biljka.Cena}
            onChange={handleChange}
          />
        </div>
        <div className="biljkaunesi">
          <label htmlFor="KolicinaNaStanju">
Količina na stanju:</label>
<input
         type="number"
         id="KolicinaNaStanju"
         name="KolicinaNaStanju"
         value={biljka.KolicinaNaStanju}
         onChange={handleChange}
       />
</div>
<div cclassName="biljkaunesi">
<label htmlFor="Deklaracija" className="biljkaunesi">Deklaracija:</label>
<input
         type="text"
         id="Deklaracija"
         name="Deklaracija"
         value={biljka.Deklaracija}
         onChange={handleChange}
       />
</div>
<button type="submit">Izmeni biljku</button>
</form>
<p>{poruka}</p>
</div>
);
}

export default IzmeniBiljkuForma;