import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Korpa.css';

const PrikaziSveBiljkeUKorpi = () => {
  const [userName, setUserName] = useState('');
  const [biljkeUKorpi, setBiljkeUKorpi] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
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
        setIsAdmin(true);
        setIsButtonDisabled(false); // Omogući dugme ako je korisnik prijavljen
      }
    }
  }, []);

  const handlePrikaziBiljke = async () => {
    setLoading(true);
    setError(null);

    try {
      const token1 = localStorage.getItem('token');
      const decodedtoken1 = decodeToken(token1);

      const response = await axios.get(`https://localhost:7193/Korpa/PrikaziSveBiljkeUKorpi/${decodedtoken1.username}`);
      setBiljkeUKorpi(response.data);
    } catch (error) {
      setError('Došlo je do pogreške prilikom dohvaćanja biljaka u korpi');
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <div>
      <div className="kolona">
        <button onClick={() => handlePrikaziBiljke()} disabled={isButtonDisabled}>
          Prikazi biljke u korpi
        </button>
      </div>
      {loading ? (
        <p>Učitavanje...</p>
      ) : (
        <div>
          {biljkeUKorpi.length === 0 ? (
            <p>Nema biljaka u korpi</p>
          ) : (
            <ul>
              {biljkeUKorpi.map((biljka, index) => (
                <li key={index}>
                  <p>Naziv biljke: {biljka.biljka.naziv}</p>
                  <p>Količina: {biljka.kolicinaProizvoda}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
      {error && <p>{error}</p>}
    </div>
  );
};

export default PrikaziSveBiljkeUKorpi;