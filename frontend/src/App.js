
import './App.css';
import React from 'react';

import Footer from './components/Footer/Footer.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header.js';
import Onama from './components/Onama/Onama.js';
import Korpa from './components/Korpa/Korpa.js';
import Kontakt from './components/Kontakt/Kontakt.js';
import Pocetna from './components/Pocetna/Pocetna.js';
import Biljke from './components/Biljke/Biljke.js';
import Cvecare from './components/Cvecare/Cvecare.js';
import Gradovi from './components/Gradovi/Gradovi.js';


import RegistracijaIUlogovanje from './components/RegistracijaIUlogovanje/RegistracijaIUlogovanje.js';




function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route exact path="/" element={<Pocetna />} />
          <Route path="/onama" element={<Onama />} />
          <Route path="/kontakt" element={<Kontakt />} />
          <Route path="/korpa" element={<Korpa />} />
          <Route path="/biljke" element={<Biljke />} /> 
          <Route path="/cvecare" element={<Cvecare />} /> 
          <Route path="/gradovi" element={<Gradovi />} /> 

          <Route path="/registracijaiulogovanje" element={<RegistracijaIUlogovanje />} /> 
        

        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;


// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }
