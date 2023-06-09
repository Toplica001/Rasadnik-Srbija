import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Korpa.css';

const UkloniKorpu = () => {
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(false);
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
        setUserName(decodedToken.username);
        setIsButtonDisabled(false);
      }
    }
  }, []);

  const handleUkloniKorpu = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      const decoded = decodeToken(token);

      const response = await axios.delete(`https://localhost:7193/Korpa/UkloniKorpu/${decoded.username}`);
      // Ako je status odgovora 204 (No Content), tada je korpa uspešno uklonjena
      if (response.status === 204) {
        console.log('Korpa uspešno uklonjena');
        // Ovde možeš dodati dodatne akcije koje želiš izvršiti nakon uklanjanja korpe
      } else {
        console.log('Neuspešno uklanjanje korpe');
      }
    } catch (error) {
      setError('Došlo je do greške prilikom uklanjanja korpe');
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <div className="kolona">
      <p>Korisničko ime: {userName}</p>
      <button onClick={handleUkloniKorpu} disabled={isButtonDisabled || loading}>
        Ukloni korpu
      </button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default UkloniKorpu;