import React, { useState } from "react";

function IzbrisiSortu() {
  const [sortaID, setSortaID] = useState(0);
  const [responseMessage, setResponseMessage] = useState("");

  const handleInputChange = (event) => {
    setSortaID(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (sortaID <= 0) {
      setResponseMessage("Los id sorte.");
      return;
    }

    try {
      const response = await fetch(`/IzbrisiSortu/${sortaID}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (response.ok) {
        setResponseMessage(`Obrisana je sorta sa ID-jem: ${sortaID}.`);
      } else {
        setResponseMessage(data);
      }
    } catch (error) {
      setResponseMessage("Došlo je do greške prilikom slanja zahteva.");
    }
  };

  return (
    <div>
      <h2>Forma za brisanje sorte</h2>
      <form onSubmit={handleFormSubmit}>
        <label>
          Sorta ID:
          <input
            type="number"
            value={sortaID}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Izbriši sortu</button>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
}


export default IzbrisiSortu;