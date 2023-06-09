 import './Gradovi.css';
//  import React, { useState, useEffect } from "react";

// function Gradovi() {
//   const [gradovi, setGradovi] = useState([]);

//   useEffect(() => {
//     async function fetchGradovi() {
//       const response = await fetch("https://localhost:3000/api/Gradovi/VratiSveGradove");
//       const data = await response.json();
//       setGradovi(data);
//     }

//     fetchGradovi();
//   }, []);

//   return (
//     <div>
//       <h1>Svi gradovi:</h1>
//       <ul>
//         {gradovi.map((grad) => (
//           <li key={grad.idGrada}>
//             <h3>{grad.nazivGrada}</h3>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default Gradovi;
import React, { useState, useEffect } from "react";
import UnosGradaForma from './UnosGradaForma';
import IzmeniGradForma from './IzmeniGradForma';
import IzbrisiGradForma from './IzbrisiGradForma';

function Gradovi() {
  const [gradovi, setGradovi] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false); // Dodata nova promenljiva za proveru admina

  useEffect(() => {
    async function fetchGradovi() {
      const response = await fetch("https://localhost:7193/Grad/VratiSveGradove");
      const data = await response.json();
      setGradovi(data);
    }

    fetchGradovi();
  }, []);

  useEffect(() => {
    // Provera uloge korisnika
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = decodeToken(token);
      if (decodedToken && decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]==="Admin") {
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

  return (
    <div className="grad">
      <h2>Dragi cvećari!</h2>
      <h3>Nasa komanija tezi da omoguci usluge ljudima sirom Srbije.
         Poceli smo sa radom najpre u većim gradovima, a onda želimo da obuhvatimo i manje
          i nećemo stati dok svaki grad i selo ne dobiju mogućnost da koriste našu aplikaciju 
          za lakši rad njihove cvećare. </h3>
      <h3>Trenutno nudimo usluge cvećarama na teritoriji sledećih gradova:</h3>
      <div className="dgra">
        {gradovi.map((grad) => (
          <div className="nazivdgra" key={grad.idGrada}>
            <h3>{grad.nazivGrada}</h3>
          </div>
        ))}
      </div>
      <h4>Vaše poverenje je jedini način kako bismo nastavili sa daljim radom i ekspanzijom. Budite u korak sa vremenom
         i omogućite da i vaš grad, ukoliko već nije, dobije mogućnost ovakve aplikacije. Udruženje cvećara u Srbiji je pokrenulo 
         peticiju širenja naše aplikacije širom Srbije. Nadamo se da se u skorijem vremenu vidimo i u vašoj cvećari 
         u bilo kom delu naše zemlje!!! </h4>
        <div className="gradforme">
         {isAdmin && <UnosGradaForma/>}
         {isAdmin && <IzmeniGradForma/>}
         {isAdmin && <IzbrisiGradForma/>}
         </div>
    </div>
  );
}

export default Gradovi;