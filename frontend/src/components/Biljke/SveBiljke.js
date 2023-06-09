import React, { useEffect, useState } from 'react';
import axios from 'axios';

import './Biljke.css';

function SveBiljke() {
  const [biljke, setBiljke] = useState([]);
  const [kolicine, setKolicine] = useState([]);
  const [cenaPorudzbine, setCenaPorudzbine] = useState(0);
  const [ulogovan, setUlogovan] = useState(false); // Dodatno stanje za praćenje ulogovanog korisnika

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
    async function fetchData() {
      const response = await axios.get('https://localhost:7193/Biljka/VratiSveBiljke');
      const sortedBiljke = response.data.sort((a, b) =>
        a.cvecara.nazivCvecare.localeCompare(b.cvecara.nazivCvecare)
      );
      setBiljke(sortedBiljke);
      const initialKolicine = sortedBiljke.map((biljka) => ({
        biljkaId: biljka.biljkaId,
        kolicina: 1,
      }));
      setKolicine(initialKolicine);
    }
    fetchData();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUlogovan(true);
    }
  }, []);

  async function dodajUKorpu(biljkaId) {
    const kolicina = kolicine.find((obj) => obj.biljkaId === biljkaId).kolicina;
    try {
      const token = localStorage.getItem('token');
      const decoded = decodeToken(token);
      await axios.post(`https://localhost:7193/Korpa/DodajBiljkuUKorpu/${biljkaId}/${kolicina}/${decoded.username}`);
      setTimeout(() => {
        izracunajCenuPorudzbine();
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  }
  
  async function ukloniIzKorpe(biljkaId) {
    try {
      const token = localStorage.getItem('token');
      const decoded = decodeToken(token);
      await axios.delete(`https://localhost:7193/Korpa/UkloniBiljkuIzKorpe/${biljkaId}/${decoded.username}`);
      setTimeout(() => {
        izracunajCenuPorudzbine();
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  }
  
  async function izmeniKolicinu(biljkaId, novaKolicina) {
    try {
      const token = localStorage.getItem('token');
      const decoded = decodeToken(token);
      await axios.put(`https://localhost:7193/Korpa/IzmeniKolicinuUKorpi/${biljkaId}/${novaKolicina}/${decoded.username}`);
      const updatedKolicine = kolicine.map((obj) => {
        if (obj.biljkaId === biljkaId) {
          return { ...obj, kolicina: novaKolicina };
        }
        return obj;
      });
      setKolicine(updatedKolicine);
    } catch (error) {
      console.log(error);
    }
  }

  function izracunajCenuPorudzbine() {
    let novaCena = 0;
    biljke.forEach((biljka) => {
      const kolicinaObj = kolicine.find((obj) => obj.biljkaId === biljka.biljkaId);
      if (kolicinaObj) {
        novaCena += biljka.cena * kolicinaObj.kolicina;
      }
    });
    setCenaPorudzbine(novaCena);
  }

  useEffect(() => {
    izracunajCenuPorudzbine();
  }, [biljke, kolicine]);

  return (
    <div className="svebiljke">
      {biljke.map((biljka) => {
        const kolicinaObj = kolicine.find((obj) => obj.biljkaId === biljka.biljkaId);
        return (
          <div className="b" key={biljka.biljkaId}>
            <img
              className="sl"
              src={`https://localhost:7193/Slika/VratiSliku/${biljka.biljkaId}`}
              alt={biljka.naziv}
            />
            <h2>{biljka.naziv}</h2>
            <p className="p">Cena: {biljka.cena}</p>
            <p className="p">{biljka.kolicinaNaStanju === 0 ? 'RASPRODATO!!!' : `Količina: ${biljka.kolicinaNaStanju}`}</p>
            <p className="p">Deklaracija: {biljka.deklaracija}</p>
            {biljka.cvecara && (
              <p className="p">Naziv cvećare: {biljka.cvecara.nazivCvecare}</p>
            )}
            {ulogovan && (
              <div
                className="dugme"
                onClick={() => dodajUKorpu(biljka.biljkaId)}
              >
                Dodaj u korpu
              </div>
            )}
            
            {ulogovan && (
              <div
                className="dugme"
                onClick={() => ukloniIzKorpe(biljka.biljkaId)}
              >
                Ukloni iz korpe
              </div>
            )}
            
            {ulogovan && (
  <div className="bol">
    <input
      type="number"
      placeholder="Nova količina"
      value={kolicinaObj ? kolicinaObj.kolicina : 1}
      onChange={(e) => {
        const novaKolicina = parseInt(e.target.value);
        if (!isNaN(novaKolicina)) {
          const updatedKolicine = kolicine.map((obj) => {
            if (obj.biljkaId === biljka.biljkaId) {
              return { ...obj, kolicina: novaKolicina };
            }
            return obj;
          });
          setKolicine(updatedKolicine);
        }
      }}
      disabled={!kolicinaObj}
    />
    <div
      className="dugme"
      onClick={() =>
        izmeniKolicinu(
          biljka.biljkaId,
          kolicinaObj ? kolicinaObj.kolicina : 1
        )
      }
    >
      Izmeni količinu
    </div>
  </div>
)}


          </div>
        );
      })}
    </div>
  );
}

export default SveBiljke;

// import './Biljke.css';
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';



// function SveBiljke() {
//   const [biljke, setBiljke] = useState([]);
  
//   useEffect(() => {
//   async function fetchData() {
//   const response = await axios.get('https://localhost:7193/Biljka/VratiSveBiljke');
//   setBiljke(response.data);
//   }
//   fetchData();
//   }, []);
  
//   // Grupiraj biljke po atributu "naziv"
//   const groupedBiljke = biljke.reduce((acc, curr) => {
//   if (!acc[curr.naziv]) {
//   acc[curr.naziv] = curr;
//   }
//   return acc;
//   }, {});
  
//   // Mapiraj grupirane biljke na JSX
//   return (
//   <div className="svebiljke">
//   <h2 className="hsvebiljke">Trenutno dostupne biljke</h2>
//   {Object.values(groupedBiljke).map((biljka) => (
//   <div className="b" key={biljka.biljkaId}>
//   <img
//            className="sl"
//            src={`https://localhost:7193/Slika/VratiSliku/${biljka.biljkaId}`}
//            alt={biljka.naziv}
//          />
//   <h2>{biljka.naziv}</h2>
//   <p className="p">Cena i kolicina(okvirno):{biljka.cena}</p>
//   <p className="p">Deklaracija: {biljka.deklaracija}</p>
//   </div>
//   ))}
//   </div>
//   );
//   }
  
//   export default SveBiljke;

// function SveBiljke() {
//   const [biljke, setBiljke] = useState([]);

//   useEffect(() => {
//     async function fetchData() {
//       const response = await axios.get('https://localhost:7193/Biljka/VratiSveBiljke');
//       setBiljke(response.data);
//     }
//     fetchData();
//   }, []);
 

// //src={`../Slike/${biljka.slikaBiljke}`}

//   return (
//     <div className="svebiljke">
//       <h2 className="hsvebiljke">Trenutno dostupne biljke</h2>
//       {biljke.map((biljka) => (
//         <div className="b" key={biljka.biljkaId}>


// <img
//   className="sl"
//   src={bombonica}
//   alt={biljka.naziv}
// />

//           <h2>{biljka.naziv}</h2>
//           <h2>{biljka.slikaBiljke}</h2>

          

//           <p>Cena i kolicina: Ovisno o cvecari</p>
//           <p>Deklaracija: {biljka.deklaracija}</p>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default SveBiljke;