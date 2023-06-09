import './Cvecare.css';
import React, { useState,useEffect } from 'react';
import axios from 'axios';

function FiltriranjeCvecara() {
  const [nazivGrada, setNazivGrada] = useState('');
  const [nazivBiljke, setNazivBiljke] = useState('');
  const [presekCvecara, setPresekCvecara] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [srednjeOcene, setSrednjeOcene] = useState({});
  const [cvecare, setCvecare] = useState([]);

  useEffect(() => {
    async function fetchCvecare() {
      const response = await fetch("https://localhost:7193/Cvecara/VratiSveCvecare");
      const data = await response.json();
      setCvecare(data);
    }

    fetchCvecare();
  }, []);

  useEffect(() => {
    async function fetchSrednjeOcene() {
      const ocenePromises = cvecare.map((c) => getSrednjaOcena(c.cvecaraId));
      const ocene = await Promise.all(ocenePromises);

      const srednjeOceneObj = {};
      cvecare.forEach((c, index) => {
        srednjeOceneObj[c.cvecaraId] = ocene[index];
      });

      setSrednjeOcene(srednjeOceneObj);
    }

    fetchSrednjeOcene();
  }, [cvecare]);

  const getSrednjaOcena = async (cvecaraId) => {
    try {
      const response = await axios.get(`https://localhost:7193/OcenaFirme/SrednjaOcenaCvecare/${cvecaraId}`);
      const srednjaOcena = response.data;
      return srednjaOcena;
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
      } else {
        console.log('Došlo je do greške prilikom dobijanja srednje ocene cvecare.');
      }
      return null;
    }
  };

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      const response = await axios.get(`https://localhost:7193/Cvecara/VratiPresekCvecaraPoGraduIBiljci/${nazivGrada}/${nazivBiljke}`);
      setPresekCvecara(response.data);
    } catch (error) {
      setErrorMessage('Došlo je do greške prilikom filtriranja cvećara.');
      setPresekCvecara([]);
    }
  };

  return (
    <div>
      <h1>Filtriraj cvecare po gradu i biljci:</h1>

      <form onSubmit={handleSubmit} className="nova">
        <label>
          Naziv grada:
          <input type="text" value={nazivGrada} onChange={event => setNazivGrada(event.target.value)} />
        </label>
        <label>
          Naziv biljke:
          <input type="text" value={nazivBiljke} onChange={event => setNazivBiljke(event.target.value)} />
        </label>
        <button type="submit">Filtriraj</button>
      </form>
      
      {errorMessage && <p>{errorMessage}</p>}
      
      {presekCvecara.length > 0 ? (
        <div className="ccc">
          {presekCvecara.map((presekCvecara) => (
            <div key={presekCvecara.cvecaraId}  className="c">
              <h3>{presekCvecara.nazivCvecare}</h3>
              <p>{presekCvecara.lokacija}</p>
              <p>{presekCvecara.imePrezimeVlasnika}</p>
              <p>
              Srednja ocena: {srednjeOcene[presekCvecara.cvecaraId] || 'Nije ocenjeno'}
            </p>
            </div>
          ))}
        </div>
      ) : (
        <p>Za uneti grad, ne postoje cvecare u bazi</p>
      )}
    </div>
  );
}

export default FiltriranjeCvecara;