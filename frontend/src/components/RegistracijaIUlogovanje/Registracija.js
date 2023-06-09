import React, { useState } from "react";
import axios from "axios";
import Ulogovanje from "./Ulogovanje";

function Registracija() {
  const [ime, setIme] = useState("");
  const [prezime, setPrezime] = useState("");
  const [email, setEmail] = useState("");
  const [korisnickoIme, setKorisnickoIme] = useState("");
  const [sifra, setSifra] = useState("");
  const [adresa, setAdresa] = useState("");
  const [prikaziSifru, setPrikaziSifru] = useState(false);
  const [registracijaUspesna, setRegistracijaUspesna] = useState(false); // Dodatno stanje za prikaz forme za prijavu

  function handleSubmit(event) {
    event.preventDefault();

    axios
      .post("https://localhost:7193/Korisnik/RegistrujSe", {
        ImeKorisnika: ime,
        PrezimeKorisnika: prezime,
        EmailKorisnika: email,
        KorisnickoIme: korisnickoIme,
        SifraKorisnika: sifra,
        AdresaKorisnika: adresa,
      })
      .then((response) => {
        console.log(response.data);
        setRegistracijaUspesna(true); // Podešavanje stanja na true nakon uspešne registracije
      })
      .catch((error) => {
        console.log(error);
      });
  }

  if (registracijaUspesna) {
    return <Ulogovanje />;
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="ff">
          <h2>Registruj svoj nalog</h2>
          <div className="input-wrapper">
            <input
              type="text"
              placeholder="Ime"
              value={ime}
              onChange={(event) => setIme(event.target.value)}
            />
            <br />
          </div>
          <div className="input-wrapper">
            <input
              type="text"
              placeholder="Prezime"
              value={prezime}
              onChange={(event) => setPrezime(event.target.value)}
            />
            <br />
          </div>
          <div className="input-wrapper">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <br />
          </div>
          <div className="input-wrapper">
            <input
              type="text"
              placeholder="Adresa"
              value={adresa}
              onChange={(event) => setAdresa(event.target.value)}
            />
            <br />
          </div>
          <div className="input-wrapper">
            <input
              type="text"
              placeholder="Korisničko ime"
              value={korisnickoIme}
              onChange={(event) => setKorisnickoIme(event.target.value)}
            />
            <br />
          </div>
          <div className="input-wrapper">
            <input
              type={prikaziSifru ? "text" : "password"}
              placeholder="Šifra"
              value={sifra}
              onChange={(event) => setSifra(event.target.value)}
            />
            <div
              className="sifra-toggle"
              onClick={() => setPrikaziSifru(!prikaziSifru)}
            >
              {prikaziSifru ? "Sakrij šifru" : "Prikaži šifru"}
            </div>
            <br />
          </div>
          <button type="submit">Registruj se</button>
        </div>
      </form>
    </div>
  );
}

export default Registracija;