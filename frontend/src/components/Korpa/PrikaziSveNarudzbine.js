import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Korpa.css';

const PrikaziSveNarudzbine = () => {
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(false);
  const [narudzbine, setNarudzbine] = useState([]);
  const [error, setError] = useState(null);
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
        setUserName(decodedToken.KorisnickoIme);
        setIsButtonDisabled(false);
      }
    }
  }, []);

  const handlePrikaziNarudzbine = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      const decoded = decodeToken(token);
      const response = await axios.get(`https://localhost:7193/Porudzbina/VratiPorudzbine/${decoded.username}`);
      setNarudzbine(response.data);
      console.log('Narudžbine uspešno učitane');
      // Ovdje možeš dodati dodatne akcije koje želiš izvršiti nakon učitavanja narudžbina
    } catch (error) {
      setError('Došlo je do pogreške prilikom učitavanja narudžbina');
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <div className="kolona">
      <button onClick={handlePrikaziNarudzbine} disabled={isButtonDisabled}>
        Prikaži sve narudžbine
      </button>
      {narudzbine.length > 0 && (
        <div className="kolona">
          <h2>Sve narudžbine:</h2>
          {narudzbine.map((narudzbina) => (
            <div key={narudzbina.id}>
              <p>Adresa: {narudzbina.adresaKupca}</p>
              <p>Ukupna cena: {narudzbina.ukupnaCena}</p>
              <p>Broj biljaka: {narudzbina.brojBiljaka}</p>
              {/* Ovdje prikaži ostale detalje narudžbine */}
              <hr />
            </div>
          ))}
        </div>
      )}
      {error && <p>{error}</p>}
    </div>
  );
};

export default PrikaziSveNarudzbine;
