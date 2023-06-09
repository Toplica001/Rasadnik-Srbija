import React, { useState } from "react";
import axios from "axios";

const IzmeniCenu = () => {
  const [novaCena, setNovaCena] = useState("");
  const [biljkaID, setBiljkaID] = useState("");

  const handleNovaCenaChange = (event) => {
    setNovaCena(event.target.value);
  };

  const handleBiljkaIDChange = (event) => {
    setBiljkaID(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await axios.put(`/api/Biljke/IzmeniCenu/${novaCena}/${biljkaID}`);
    console.log(response.data);
    setNovaCena("");
    setBiljkaID("");
  };

  return (
    <div>
      <h2>Izmeni cenu biljke</h2>
      <form onSubmit={handleSubmit}>
        <label>
          ID biljke:
          <input type="text" value={biljkaID} onChange={handleBiljkaIDChange} />
        </label>
        <label>
          Nova cena:
          <input type="text" value={novaCena} onChange={handleNovaCenaChange} />
        </label>
        <button type="submit">Izmeni cenu</button>
      </form>
    </div>
  );
};

export default IzmeniCenu;