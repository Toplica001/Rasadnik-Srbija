

import React, { useState } from "react";

function IzmeniSortu() {
  const [sortaID, setSortaID] = useState(0);
  const [nazivSorte, setNazivSorte] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const handleSortaIDChange = (event) => {
    setSortaID(event.target.value);
  };

  const handleNazivSorteChange = (event) => {
    setNazivSorte(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (sortaID <= 0) {
      setResponseMessage("Nije validan ID sorte.");
      return;
    }

    if (!nazivSorte || nazivSorte.length > 20) {
      setResponseMessage("Unet je los naziv za sortu.");
      return;
    }

    try {
      const response = await fetch(`/IzmeniSortu/${sortaID}/${nazivSorte}`, {
        method: "PUT",
      });

      const data = await response.json();

      if (response.ok) {
        setResponseMessage(`Sorta je izmenjena: ${data}`);
      } else {
        setResponseMessage(data);
      }
    } catch (error) {
      setResponseMessage("Došlo je do greške prilikom slanja zahteva.");
    }
  };

  return (
    <div>
      <h2>Forma za izmenu sorte</h2>
      <form onSubmit={handleFormSubmit}>
        <label>
          Sorta ID:
          <input
            type="number"
            value={sortaID}
            onChange={handleSortaIDChange}
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
        <button type="submit">Izmeni sortu</button>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
}

export default IzmeniSortu;