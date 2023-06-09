import './Korpa.css';
import React, { useState ,useEffect} from 'react';
import axios from 'axios';

function OcenjivanjeCvecare() {
  const [cvecaraNaziv, setCvecaraNaziv] = useState('');
  const [ocena, setOcena] = useState('');
  const [userName, setUserName] = useState('');
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

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const decoded = decodeToken(token);
      await axios.post(`https://localhost:7193/OcenaFirme/OceniCvecaru/${cvecaraNaziv}/${ocena}/${decoded.username}`);
      alert('Uspesno ste ocenili cvecaru!');
    } catch (error) {
      if (error.response) {
        alert(error.response.data);
      } else {
        alert('Došlo je do greške prilikom ocenjivanja cvecare.');
      }
    }
  };

  return (
    <div className="kolona">
      <form onSubmit={handleSubmit}>
        <div className="kolona">
          <label>Naziv Cvecare:</label>
          <input
            type="text"
            value={cvecaraNaziv}
            onChange={(e) => setCvecaraNaziv(e.target.value)}
            required
          />
        </div>
        <div className="kolona">
          <label>Ocena (1-5):</label>
          <input
            type="number"
            value={ocena}
            min="1"
            max="5"
            onChange={(e) => setOcena(e.target.value)}
            required
          />
        </div>
        
        <button type="submit" disabled={!userName}>Oceni Cvecaru</button>
      </form>
    </div>
  );
}

export default OcenjivanjeCvecare;