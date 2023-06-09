
import PotvrdiPorudzbinu from '../Korpa/PotvrdiPorudzbinu.js';
import Oceni from '../Korpa/Oceni.js';
import Prikazi from '../Korpa/PrikaziKorpu.js';



import './Korpa.css';
import UkloniKorpu from './UkloniKorpu.js';
import PrikaziSveNarudzbine from './PrikaziSveNarudzbine.js';


function Korpa() {
  return (
    <div className="korpa">
     
     <div className="korpaprikazi">
      <h2>Ovo je vasa korpa!</h2>
    <Prikazi />
    </div>

    <div className="korpaukloni">
    <h3>Izbrisite sve iz vase korpe!</h3>
    <UkloniKorpu/>
    </div>
   

    <div className="korpaporudzbina">
    <h3>Potvrdite porudzbinu!</h3>
    <PotvrdiPorudzbinu />
    </div>
   

    <div className="korpasveporudzbine">
    <h3>Pregledaj sve porudzbine!</h3>

    <PrikaziSveNarudzbine/>
    </div>
    
      
    <div className="korpaoceni">
    <h3>Oceni zeljenu cvecaru!</h3>
    <Oceni />
    </div>
   
    </div>
    
  );
}

export default Korpa;




// import React, { useState } from 'react';
// import './Korpa.css';

// function Korpa() {
//   const [korpa, setKorpa] = useState([]); // niz za čuvanje biljaka u korpi

//   // funkcija koja se poziva kada korisnik klikne na dugme "Dodaj u korpu"
//   const dodajUKorpu = (biljka) => {
//     setKorpa([...korpa, biljka]); // dodajemo novu biljku u niz korpa
//   };

//   // funkcija koja se poziva kada korisnik klikne na dugme "Ukloni iz korpe"
//   const ukloniIzKorpe = (biljka) => {
//     const novaKorpa = korpa.filter((item) => item.id !== biljka.id);
//     setKorpa(novaKorpa);
//   };

//   // funkcija za renderovanje pojedinačne biljke u listi
//   const renderBiljka = (biljka) => (
//     <div className="biljka" key={biljka.id}>
//       <img src={biljka.slika} alt={biljka.naziv} />
//       <h3>{biljka.naziv}</h3>
//       <p>{biljka.opis}</p>
//       <button onClick={() => dodajUKorpu(biljka)}>Dodaj u korpu</button>
//     </div>
//   );

//   // funkcija za renderovanje liste biljaka
//   const renderListaBiljaka = () => (
//     <div className="lista-biljaka">
//       {listaBiljaka.map(renderBiljka)}
//     </div>
//   );

//   // funkcija za renderovanje korpe
//   const renderKorpa = () => (
//     <div className="korpa">
//       <h2>Korpa</h2>
//       <ul>
//         {korpa.map((biljka) => (
//           <li key={biljka.id}>
//             {biljka.naziv}{' '}
//             <button onClick={() => ukloniIzKorpe(biljka)}>Ukloni iz korpe</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );

//   return (
//     <div className="korpa-stranica">
//       {renderListaBiljaka()}
//       {renderKorpa()}
//     </div>
//   );
// }

// export default Korpa;