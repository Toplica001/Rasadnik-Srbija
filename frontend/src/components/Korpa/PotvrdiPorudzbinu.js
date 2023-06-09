import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Korpa.css';

const PoruciBiljke = () => {
  const [userName, setUserName] = useState('');
  const [adresa, setAdresa] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [porudzbina, setPorudzbina] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const decodeToken = (token) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.log('Greška prilikom dekodiranja tokena:', error);
      return null;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = decodeToken(token);
      if (decodedToken) {
        setUserName(decodedToken.username);
        setIsButtonDisabled(false);
      }
    }
  }, []);

  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };

  const handleAdresaChange = (event) => {
    setAdresa(event.target.value);
  };

  const handlePotvrdiPorudzbinu = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      const decoded = decodeToken(token);
      const response = await axios.post(`https://localhost:7193/Porudzbina/PoruciBiljke/${adresa}/${decoded.username}`);

      if (response.status === 200) {
        setPorudzbina(response.data);
        console.log('Porudžbina uspešno potvrđena');
        // Ovdje možeš dodati dodatne akcije koje želiš izvršiti nakon potvrđivanja porudžbine
      } else {
        console.log('Neuspješna potvrda porudžbine');
      }
    } catch (error) {
      setError('Došlo je do pogreške prilikom potvrđivanja porudžbine');
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <div className="kolona">
      <label className="kolona">
        Unesite adresu:
        <input type="text" value={adresa} onChange={handleAdresaChange} />
      </label>
      <button onClick={handlePotvrdiPorudzbinu} disabled={isButtonDisabled || loading}>
        Potvrdi porudžbinu
      </button>
      {porudzbina && (
        <div className="kolona">
          <h2>Detalji porudžbine:</h2>
          <p>Adresa: {porudzbina.adresaKupca}</p>
          <p>Cena: {porudzbina.ukupnaCena}</p>
          <p>Broj biljaka: {porudzbina.brojBiljaka}</p>
        </div>
      )}
      {error && <p>{error}</p>}
    </div>
  );
};

export default PoruciBiljke;