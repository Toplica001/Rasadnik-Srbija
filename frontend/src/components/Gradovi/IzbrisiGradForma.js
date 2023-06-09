import React, { useState } from 'react';
import axios from 'axios';

function BrisanjeGradaForma() {
  const [gradID, setGradID] = useState('');
  const [poruka, setPoruka] = useState('');

  const handleChange = (event) => {
    setGradID(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const confirmed = window.confirm('Da li ste sigurni da želite da obrišete grad?');

    if (confirmed) {
      try {
        const response = await axios.delete('https://localhost:7193/Grad/IzbrisiGrad/' + gradID);
        setPoruka(response.data);
        // Ovdje možete dodati logiku za prikaz poruke o uspešnom brisanju grada ili ažuriranju stanja na osnovu odgovora servera
      } catch (error) {
        console.error(error);
        // Ovdje možete dodati logiku za prikaz poruke o grešci ili ažuriranju stanja na osnovu greške
      }
    }

    setGradID('');
  };

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <p>Izbriši Grad</p>
          <label htmlFor="gradID">ID grada:</label>
          <input
            type="number"
            id="gradID"
            name="gradID"
            value={gradID}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Izbriši grad</button>
      </form>
      <p>{poruka}</p>
    </div>
  );
}

export default BrisanjeGradaForma;