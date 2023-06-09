import React, { useState, useEffect } from 'react';
import SveBiljke from '../Biljke/SveBiljke';
import BiljkeForma from '../Biljke/BiljkeForma.js';
import UnesiBiljku from './UnesiBiljkuForma';
import UkloniBiljkuForma from './UkloniBiljkuForma';
import IzmeniBiljkuForma from './IzmeniBiljku';

function Biljke() {
  const [isAdmin, setIsAdmin] = useState(false); // Dodata nova promenljiva za proveru admina

  useEffect(() => {
    // Provera uloge korisnika
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = decodeToken(token);
      if (
        decodedToken &&
        decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] === 'Admin'
      ) {
        setIsAdmin(true);
      }
    }
  }, []);

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

  return (
    <div className="glavni">
      <h1>Ovo je naša ponuda po cvećarama!!!</h1>
      <SveBiljke />
      <div className="biljkaforma">
        {isAdmin && <UnesiBiljku />}
        {isAdmin && <IzmeniBiljkuForma />}
        {isAdmin && <UkloniBiljkuForma />}
      </div>
    </div>
  );
}

export default Biljke;




// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function PrikaziBiljke() {
//   const [biljke, setBiljke] = useState([]);

//   useEffect(() => {
//     axios.get('http://localhost:5000/api/VratiSveBiljke')
//       .then(response => {
//         setBiljke(response.data);
//       })
//       .catch(error => {
//         console.log(error);
//       });
//       axios.get('http://localhost:5000/api/ProveriAutorizaciju')
//       .then(response => {
//         setIsAdmin(response.data.isAdmin);
//       })
//       .catch(error => {
//         console.log(error);
//       });
//   }, []);

//   const [idBiljke, setIdBiljke] = useState('');
//   const [novaCena, setNovaCena] = useState('');

//   const handleIdChange = (event) => {
//     setIdBiljke(event.target.value);
//   };

//   const handleCenaChange = (event) => {
//     setNovaCena(event.target.value);
//   };

//   const handleIzmeniClick = (event, biljkaId) => {
//     event.preventDefault();
//     setIdBiljke(biljkaId);
//   };

//   const handleSacuvajClick = (event) => {
//     event.preventDefault();
//     axios.put(`http://localhost:5000/api/IzmeniCenu/${novaCena}/${idBiljke}`)
//       .then(response => {
//         // Ažurirajte prikaz cene na ekranu
//         setBiljke(biljke.map(biljka => {
//           if (biljka.biljkaId === parseInt(idBiljke)) {
//             return { ...biljka, cena: novaCena };
//           } else {
//             return biljka;
//           }
//         }));
//         // Resetuj polja za unos podataka
//         setIdBiljke('');
//         setNovaCena('');
//       })
//       .catch(error => {
//         console.log(error);
//       });
//   };

//   const handleOtkaziClick = (event) => {
//     event.preventDefault();
//     setIdBiljke('');
//     setNovaCena('');
//   };

//   return (
//     <div>
//       {biljke.map(biljka => (
//         <div key={biljka.biljkaId}>
//           <h2>{biljka.naziv}</h2>
//           <p>{biljka.opis}</p>
//           <img src={biljka.slikaUrl} alt={biljka.naziv} />
//           {isAdmin && (
//             <div>
//               <button onClick={(event) => handleIzmeniClick(event, biljka.biljkaId)}>Izmeni</button>
//               {idBiljke === biljka.biljkaId && (
//                 <form>
//                   <label htmlFor="novaCena">Nova cena:</label>
//                   <input type="number" id="novaCena" name="novaCena" value={novaCena} onChange={(event) => setNovaCena(event.target.value)} />
// <button type="button" onClick={handleSacuvajClick}>Sacuvaj</button>
// <button type="button" onClick={handleOtkaziClick}>Otkazi</button>
// </form>
// )}
// </div>
// )}
// </div>
// ))}
// </div>
// );
// }

// export default PrikaziBiljke;