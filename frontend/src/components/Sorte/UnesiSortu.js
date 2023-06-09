import React, { useState } from "react";

function UnesiSortu() {
  const [cvecaraID, setCvecaraID] = useState(0);
  const [nazivSorte, setNazivSorte] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const handleCvecaraIDChange = (event) => {
    setCvecaraID(event.target.value);
  };

  const handleNazivSorteChange = (event) => {
    setNazivSorte(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (cvecaraID <= 0) {
      setResponseMessage("Nije validan ID cvecare.");
      return;
    }

    if (!nazivSorte || nazivSorte.length > 20) {
      setResponseMessage("Nije validan naziv sorte.");
      return;
    }

    try {
      const response = await fetch(`/UnesiSortu/${cvecaraID}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          NazivSorte: nazivSorte,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setResponseMessage("Uneli ste sortu u cvecaru!");
      } else {
        setResponseMessage(data);
      }
    } catch (error) {
      setResponseMessage("Došlo je do greške prilikom slanja zahteva.");
    }
  };

  return (
    <div>
      <h2>Forma za unos sorte</h2>
      <form onSubmit={handleFormSubmit}>
        <label>
          Cvecara ID:
          <input
            type="number"
            value={cvecaraID}
            onChange={handleCvecaraIDChange}
          />
        </label>
        <label>
          Naziv sorte:
          <input
            type="text"
            value={nazivSorte}
            onChange={handleNazivSorteChange}
          />
        </label>
        <button type="submit">Unesi sortu</button>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
}

export default UnesiSortu;