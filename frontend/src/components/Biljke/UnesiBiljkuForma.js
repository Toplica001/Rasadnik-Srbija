import React, { useState } from 'react';
import axios from 'axios';

const UnesiBiljkuForma = () => {
  const [biljka, setBiljka] = useState({
    Naziv: '',
    SlikaBiljke: '',
    Cena: 0,
    KolicinaNaStanju: 0,
    Deklaracija: '',
    SortaID: 0,
    CvecaraID: 0
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setBiljka((prevBiljka) => ({
      ...prevBiljka,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { Naziv, SlikaBiljke, Cena, KolicinaNaStanju, Deklaracija, SortaID, CvecaraID } = biljka;

    try {
      const response = await axios.post(
        `https://localhost:7193/Biljka/UnesiBiljku/${SortaID}/${CvecaraID}`,
        {
          Naziv,
          SlikaBiljke,
          Cena,
          KolicinaNaStanju,
          Deklaracija
        }
      );
      console.log(response.data); // Ispisuje uspešan odgovor
      // Dodaj logiku za obradu uspešnog unosa biljke
    } catch (error) {
      console.error(error);
      // Dodaj logiku za obradu greške
    }
  };

  return (
    <form onSubmit={handleSubmit} className="biljkaunesi">
      <h2>Unesi biljku!</h2>
      <label className="biljkaunesi">
        Naziv:
        <input
          type="text"
          name="Naziv"
          value={biljka.Naziv}
          onChange={handleChange}
        />
      </label>
      <br />
      <label className="biljkaunesi">
        Slika biljke:
        <input
          type="text"
          name="SlikaBiljke"
          value={biljka.SlikaBiljke}
          onChange={handleChange}
        />
      </label>
      <br />
      <label className="biljkaunesi">
        Cena:
        <input
          type="number"
          name="Cena"
          value={biljka.Cena}
          onChange={handleChange}
        />
      </label>
      <br />
      <label className="biljkaunesi">
        Količina na stanju:
        <input
          type="number"
          name="KolicinaNaStanju"
          value={biljka.KolicinaNaStanju}
          onChange={handleChange}
        />
      </label>
      <br />
      <label className="biljkaunesi">
        Deklaracija:
        <textarea
          name="Deklaracija"
          value={biljka.Deklaracija}
          onChange={handleChange}
        />
      </label>
      <br />
      <label className="biljkaunesi">
        ID sorte:
        <input
          type="number"
          name="SortaID"
          value={biljka.SortaID}
          onChange={handleChange}
        />
      </label>
      <br />
      <label className="biljkaunesi">
        ID cvećare:
        <input
          type="number"
          name="CvecaraID"
          value={biljka.CvecaraID}
          onChange={handleChange}
        />
      </label>
      <br />
      <button type="submit">Unesi biljku</button>
    </form>
  );
};

export default UnesiBiljkuForma;