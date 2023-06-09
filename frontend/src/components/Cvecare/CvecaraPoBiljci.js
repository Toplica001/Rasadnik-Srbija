import React, { useState ,useEffect} from 'react';
import './Cvecare.css';
import axios from 'axios';

function PretragaCvecara() {
  const [cvecare1, setCvecare1] = useState([]);
  const [srednjeOcene, setSrednjeOcene] = useState({});

  useEffect(() => {
    async function fetchCvecare() {
      const response = await fetch("https://localhost:7193/Cvecara/VratiSveCvecare");
      const data = await response.json();
      setCvecare1(data);
    }

    fetchCvecare();
  }, []);

  useEffect(() => {
    async function fetchSrednjeOcene() {
      const ocenePromises = cvecare1.map((c) => getSrednjaOcena(c.cvecaraId));
      const ocene = await Promise.all(ocenePromises);

      const srednjeOceneObj = {};
      cvecare1.forEach((c, index) => {
        srednjeOceneObj[c.cvecaraId] = ocene[index];
      });

      setSrednjeOcene(srednjeOceneObj);
    }

    fetchSrednjeOcene();
  }, [cvecare1]);

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

  const [nazivBiljke, setNazivBiljke] = useState('');
  const [cvecare, setCvecare] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      const response = await axios.get(`https://localhost:7193/Cvecara/VratiCvecareKojeSadrzeBiljku/${nazivBiljke}`);
      setCvecare(response.data);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setErrorMessage(error.response.data);
      } else {
        setErrorMessage('Došlo je do greške prilikom pretraživanja cvećara.');
      }
      setCvecare([]);
    }
  };

  return (
    <div>
      <h1>Filtriraj cvecare po biljci:</h1>

      <form onSubmit={handleSubmit} className="nova">
        <label>
          Naziv biljke:
          <input type="text" value={nazivBiljke} onChange={event => setNazivBiljke(event.target.value)} />
        </label>
        <button type="submit">Pretraži</button>
      </form>
      
      {errorMessage && <p>{errorMessage}</p>}
      
     

{cvecare.length > 0 ? (
        <div className="ccc">
          {cvecare.map((cvecara) => (
            <div key={cvecara.cvecaraId}  className="c">
              <h3>{cvecara.nazivCvecare}</h3>
              <p>{cvecara.lokacija}</p>
              <p>{cvecara.imePrezimeVlasnika}</p>
              <p>
              Srednja ocena: {srednjeOcene[cvecara.cvecaraId] || 'Nije ocenjeno'}
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

export default PretragaCvecara;