import React, { useState, useEffect } from "react";
import "./Cvecare.css";
import axios from "axios";

function CvecarePoGradu() {
  const [cvecare1, setCvecare1] = useState([]);
  const [srednjeOcene, setSrednjeOcene] = useState({});
  const [grad, setGrad] = useState("");
  const [cvecare, setCvecare] = useState([]);

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
        console.log("Došlo je do greške prilikom dobijanja srednje ocene cvecare.");
      }
      return null;
    }
  };

  async function fetchCvecarePoGradu() {
    if (grad.trim() === "") {
      // Provera da li je polje za unos prazno
      return;
    }

    const response = await fetch(`https://localhost:7193/Cvecara/VratiCvecarePoGradu/${grad}`);
    const data = await response.json();
    setCvecare(data);
  }

  function handleInputChange(event) {
    setGrad(event.target.value);
  }

  function handleButtonClick() {
    fetchCvecarePoGradu();
  }

  return (
    <div className="cvecare-po-gradu">
      <h1>Filtriraj cvecare po gradu:</h1>
      <div className="nova">
        <label htmlFor="grad-input">Unesite ime grada:</label>
        <input id="grad-input" type="text" value={grad} onChange={handleInputChange} />
        <button onClick={handleButtonClick}>Pretrazi</button>
      </div>
      {cvecare.length > 0 ? (
        <div className="ccc">
          {cvecare.map((cvecara) => (
            <div key={cvecara.cvecaraId} className="c">
              <h3>{cvecara.nazivCvecare}</h3>
              <p>{cvecara.lokacija}</p>
              <p>{cvecara.imePrezimeVlasnika}</p>
              <p>Srednja ocena: {srednjeOcene[cvecara.cvecaraId] || "Nije ocenjeno"}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Za uneti grad, ne postoje cvecare u bazi</p>
      )}
    </div>
  );
}

export default CvecarePoGradu;