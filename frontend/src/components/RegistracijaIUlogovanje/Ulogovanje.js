// Ulogovanje.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./RegistracijaIUlogovanje.css";
import Footer from "../Footer/Footer"; // Import Footer komponentu

function Ulogovanje() {
  const [korisnickoIme, setKorisnickoIme] = useState("");
  const [sifra, setSifra] = useState("");
  const [prikaziSifru, setPrikaziSifru] = useState(false);
  const [ulogovan, setUlogovan] = useState(false);
  const [prikaziGresku, setPrikaziGresku] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUlogovan(true);
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `https://localhost:7193/Korisnik/UlogujSe/${korisnickoIme}/${sifra}`
      );
      const { token } = response.data;
      localStorage.setItem("token", token);
      setUlogovan(true); // Dodajte ovu liniju za ažuriranje stanja
      console.log("Token:", token);
    } catch (error) {
      console.log(error);
      setPrikaziGresku(true);
    }
  };
  
  const handleOdjaviSe = () => {
    localStorage.removeItem("token");
    setUlogovan(false); // Dodajte ovu liniju za ažuriranje stanja
  };

  return (
    <div>
      {ulogovan ? (
        <div>
          <h3>Uspešno ste ulogovani! Uživajte u kupovini</h3>
          <button
            onClick={() => {
              window.location.href = "/biljke";
            }}
            className="dugmep"
          >
            Klikni za prikaz naše ponude
          </button>
          <button onClick={handleOdjaviSe} className="dugmep">
            Odjavi se
          </button>
          <div className="ikona-ulogovan">
            <h4>Prijavljeni ste</h4>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="ff">
            <h2 className="h">Uloguj se</h2>
            {prikaziGresku && (
              <div style={{ color: "red" }}>
                Pogrešno korisničko ime ili šifra
              </div>
            )}
            <div className="input-wrapper">
              <input
                type="text"
                value={korisnickoIme}
                onChange={(event) => setKorisnickoIme(event.target.value)}
                placeholder="Korisničko ime"
              />
            </div>
            <div className="input-wrapper">
              <input
                type={prikaziSifru ? "text" : "password"}
                value={sifra}
                onChange={(event) => setSifra(event.target.value)}
                placeholder="Šifra"
              />
              <div
                className="sifra-toggle"
                onClick={() => setPrikaziSifru(!prikaziSifru)}
              >
                {prikaziSifru ? "Sakrij šifru" : "Prikaži šifru"}
              </div>
            </div>
            <button className="input-wrapper" type="submit">
              Uloguj se
            </button>
          </div>
        </form>
      )}
  
      <Footer ulogovan={ulogovan} /> {/* Prosleđivanje ulogovan prop Footer komponenti */}
    </div>
  );
}

export default Ulogovanje;