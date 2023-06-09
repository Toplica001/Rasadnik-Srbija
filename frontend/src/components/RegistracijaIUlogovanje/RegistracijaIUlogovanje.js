import React, { useState } from "react";
import Registracija from "./Registracija";
import Ulogovanje from "./Ulogovanje";
import './RegistracijaIUlogovanje.css';


function RegistracijaIUlogovanje() {
  const [prikaziRegistraciju, setPrikaziRegistraciju] = useState(false);

  return (
    <div className="reg">
 
       <div className="rudugme">
       <p className="p">Nemas svoj nalog? Registruj se brzo i lakom klikom na dugme desno!</p>
      <button className="d" onClick={() => setPrikaziRegistraciju(true)}>
        Registruj se
      </button>
      </div>
      <div className="rudugme">
      <p className="p">Uloguj se i uzivaj u kupovini!</p>
      <button className="d" onClick={() => setPrikaziRegistraciju(false)}>
        Uloguj se
      </button>
      </div>
      {prikaziRegistraciju ? (
        <Registracija />
      ) : (
        <Ulogovanje />
      )}
      <h4 className="pp">Zasto je potrebno registrovati i ulogovati se na nas sajt?</h4>
      <h4 className="pp">Kako bi mogli stavljati zeljene stavke u korpu, zatim ih poruciti na kucnu adresu,
       neophodno je da imamo podatke o vama?</h4>
      <h4 className="pp">Sve licne podatke zadrzavamo zakljucane u nasoj bazi!</h4>
    </div>
  );
}

export default RegistracijaIUlogovanje;