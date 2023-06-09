import React, { useState, useEffect } from "react";
import UnosCvecareForma from './UnosCvecareForma';
import IzmenaCvecareForma from './IzmeniCvecareForma';
import BrisanjeCvecareForma from './BrisanjeCvecareForma';
import FiltriranjeCvecara from './FiltriranjeCvecara';
import CvecarePoGradu from './CvecaraPoGradu';
import CvecaraPoBiljci from './CvecaraPoBiljci';
import axios from 'axios';

function Cvecare() {
  const [cvecare, setCvecare] = useState([]);
  const [srednjeOcene, setSrednjeOcene] = useState({});
  const [isAdmin, setIsAdmin] = useState(false); // Dodata nova promenljiva za proveru admina

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

  useEffect(() => {
    // Provera uloge korisnika
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = decodeToken(token);
      if (decodedToken && decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]==="Admin") {
        //console.log(decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]+"1111");
        setIsAdmin(true);
      }
    }
  }, []);

  const decodeToken = (token) => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.log("Greška prilikom dekodiranja tokena:", error);
      return null;
    }
  };

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

  return (
    <div className="cvecare">
      <h1 className="h">Dostupne cvecare:</h1>
      
      <div className="ccc">
        {cvecare.map((c) => (
          <div key={c.cvecaraId} className="c">
            <h3>{c.nazivCvecare}</h3>
            <p>{c.lokacija}</p>
            <p>{c.imePrezimeVlasnika}</p>
            <p>
              Srednja ocena: {srednjeOcene[c.cvecaraId] || 'Nije ocenjeno'}
            </p>
          </div>
        ))}
      </div>
      <h3>Ukoliko zelite da i sami posetite cvecare koje su u vasoj blizini, a ne znate da li poseduju 
        odredjenu biljku kao i tacnu adresu u gradu, mozete filtrirati po zeljenom kriterijumu, a mi 
        cemo vam pruziti izbor cvecara po vasim kriterijumima. Takodje mozete videti i ocene online-korisnika
        ove aplikacije za svaku od cvecara!!!
      </h3>
      <div className="filter">
        <CvecarePoGradu />
        <CvecaraPoBiljci/>
        <FiltriranjeCvecara/>
      </div>
      {isAdmin && ( // Prikazivanje sadržaja samo administratorima
        <div className="formee">
          <UnosCvecareForma/>
          <IzmenaCvecareForma/>
          <BrisanjeCvecareForma/>
        </div>
      )}
    </div>
  );
}

export default Cvecare;