// import axios from 'axios';
// import React, { useState } from 'react';
// import './Biljke.css';

// function BiljkeForma() {
//   const [sortaID, setSortaID] = useState('');
//   const [biljka, setBiljka] = useState({
//     biljkaId: '',
//     naziv: '',
//     slikaBiljke: '',
//     cena: '',
//     kolicinaNaStanju: '',
//     deklaracija: ''
//   });
//   const [message, setMessage] = useState('');
//   const [biljkaID, setBiljkaID] = useState('');
//   const [removeMessage, setRemoveMessage] = useState('');
//   const [updateBiljka, setUpdateBiljka] = useState({
//     biljkaId: '',
//     naziv: '',
//     slikaBiljke: '',
//     cena: '',
//     kolicinaNaStanju: '',
//     deklaracija: '',
//     cvecaraID: '' // Dodato polje cvecaraID
//   });
//   const [updateMessage, setUpdateMessage] = useState('');

//   const handleChange = event => {
//     const { name, value } = event.target;
//     setBiljka(prevBiljka => ({ ...prevBiljka, [name]: value }));
//   };

//   const handleSubmit = async event => {
//     event.preventDefault();

//     try {
//       const response = await axios.post(`https://localhost:7193/Biljka/UnesiBiljku/${sortaID}`, {
//         ...biljka,
//         cvecaraID: 'cvecaraID' // Dodajte vrednost cvecaraID ovde
//       });
//       setMessage(response.data);
//     } catch (error) {
//       setMessage(error.response.data);
//     }
//   };

//   const handleUpdate = async event => {
//     event.preventDefault();

//     try {
//       const response = await axios.put(`https://localhost:7193/Biljka/IzmeniBiljku/${biljka.biljkaId}`, {
//         ...biljka,
//         cvecaraID: 'cvecaraID' // Dodajte vrednost cvecaraID ovde
//       });
//       setMessage(response.data);
//     } catch (error) {
//       setMessage(error.response.data);
//     }
//   };

//   const setUpdateBiljkaID = id => {
//     setBiljka(prevBiljka => ({ ...prevBiljka, biljkaId: id }));
//   };

//   const handleUpdateChange = event => {
//     const { name, value } = event.target;
//     setUpdateBiljka(prevBiljka => ({ ...prevBiljka, [name]: value }));
//   };

//   const updateBiljka = async event => {
//     event.preventDefault();
//     try {
//       const response = await axios.put(`https://localhost:7193/Biljka/IzmeniBiljku/${biljka.biljkaId}`, {
//         ...updateBiljka,
//         cvecaraID: 'cvecaraID' // Dodajte vrednost cvecaraID ovde
//         });
//         setUpdateMessage(response.data);
//         } catch (error) {
//         setUpdateMessage(error.response.data);
//         }
//         };
        
//         const updateBiljkaID = id => {
//         setUpdateBiljka(prevBiljka => ({ ...prevBiljka, biljkaId: id }));
//         };
        
//         const updateMessage = msg => {
//         setUpdateMessage(msg);
//         };
        
//         const handleRemove = async event => {
//         event.preventDefault();
//         try {
//           const response = await axios.put(`https://localhost:7193/Biljka/UkloniBiljku/${biljkaID}`);
//           setRemoveMessage(response.data);
//           setBiljkaID('');
//         } catch (error) {
//           setRemoveMessage(error.response.data);
//         }
//       };

//       return (
//       <div className="biljke">
//       <form className="form" onSubmit={handleSubmit}>
//       <p className="p">Unesi Biljku:</p>
//       <div className="form-group">
//       <label>
//       Sorta ID:
//       <input type="text" name="sortaID" value={sortaID} onChange={event => setSortaID(event.target.value)} />
//       </label>
//       </div>
//       <div className="form-group">
//       <label>
//       Biljka ID:
//       <input type="text" name="biljkaId" value={biljka.biljkaId} onChange={handleChange} />
//       </label>
//       </div>
//       <div className="form-group">
//       <label>
//       Naziv:
//       <input type="text" name="naziv" value={biljka.naziv} onChange={handleChange} />
//       </label>
//       </div>
//       <div className="form-group">
//       <label>
//       Slika biljke:
//       <input type="text" name="slikaBiljke" value={biljka.slikaBiljke} onChange={handleChange} />
//       </label>
//       </div>
//       <div className="form-group">
//       <label>
//       Cena:
//       <input type="text" name="cena" value={biljka.cena} onChange={handleChange} />
//       </label>
//       </div>
//       <div className="form-group">
//       <label>
//       Količina na stanju:
//       <input type="text" name="kolicinaNaStanju" value={biljka.kolicinaNaStanju} onChange={handleChange} />
//       </label>
//       </div>
//       <div className="form-group">
//       <label>
//       Deklaracija:
//       <input type="text" name="deklaracija" value={biljka.deklaracija} onChange={handleChange} />
//       </label>
//       </div>
//       <button type="submit">Unesi biljku</button>
//       </form>
//       <p>{message}</p>
//       <form className="form" onSubmit={handleRemove}>
//       <p className="p">Ukloni Biljku:</p>
//       <div className="form-group">
//       <label>
//       ID biljke:
//       <input type="text" name="biljkaID" value={biljkaID} onChange={event => setBiljkaID(event.target.value)} />
//       </label>
//       </div>
//       <button type="submit">Ukloni biljku</button>
//       </form>
//       <p>{removeMessage}</p>
// <form className="form" onSubmit={handleUpdate}>
// <p className="p">Izmeni Biljku:</p>
// <div className="form-group">
// <label>
// ID biljke:
// <input type="text" name="biljkaID" value={updateBiljka.biljkaId} onChange={event => setUpdateBiljkaID(event.target.value)} />
// </label>
// </div>
// <div className="form-group">
// <label>
// Naziv:
// <input type="text" name="naziv" value={updateBiljka.naziv} onChange={handleUpdateChange} />
// </label>
// </div>
// <div className="form-group">
// <label>
// Slika biljke:
// <input type="text" name="slikaBiljke" value={updateBiljka.slikaBiljke} onChange={handleUpdateChange} />
// </label>
// </div>
// <div className="form-group">
// <label>
// Cena:
// <input type="text" name="cena" value={updateBiljka.cena} onChange={handleUpdateChange} />
// </label>
// </div>
// <div className="form-group">
// <label>
// Količina na stanju:
// <input type="text" name="kolicinaNaStanju" value={updateBiljka.kolicinaNaStanju} onChange={handleUpdateChange} />
// </label>
// </div>
// <div className="form-group">
// <label>
// Deklaracija:
// <input type="text" name="deklaracija" value={updateBiljka.deklaracija} onChange={handleUpdateChange} />
// </label>
// </div>
// <button type="submit">Izmeni biljku</button>
// </form>
// <p>{updateMessage}</p>
// </div>
// );
// }

//export default BiljkeForma;
 import axios from 'axios';
import React, { useState} from 'react';
import './Biljke.css';

function BiljkeForma() {
  const [sortaID, setSortaID] = useState('');
  const [biljka, setBiljka] = useState({
    biljkaId: '',
    naziv: '',
    slikaBiljke: '',
    cena: '',
    kolicinaNaStanju: '',
    deklaracija: ''
  });



  const [message, setMessage] = useState('');
  const [biljkaID, setBiljkaID] = useState('');
  const [removeMessage, setRemoveMessage] = useState('');

  const handleChange = event => {
    const { name, value } = event.target;
    setBiljka(prevBiljka => ({ ...prevBiljka, [name]: value }));
  };

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      const response = await axios.post(`https://localhost:7193/Biljka/UnesiBiljku/${sortaID}`, biljka);
      setMessage(response.data);
    } catch (error) {
      setMessage(error.response.data);
    }
  };
  const handleUpdate = async event => {
    event.preventDefault();

    try {
      const response = await axios.put(`https://localhost:7193/Biljka/IzmeniBiljku/${biljka.biljkaId}`, biljka);
      setMessage(response.data);
    } catch (error) {
      setMessage(error.response.data);
    }
  };
  const setUpdateBiljkaID = (id) => {
    setBiljka(prevBiljka => ({ ...prevBiljka, biljkaId: id }));
  };
  const handleUpdateChange = (event) => {
    const { name, value } = event.target;
    setBiljka(prevBiljka => ({ ...prevBiljka, [name]: value }));
  };
  const updateBiljka = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(`https://localhost:7193/Biljka/IzmeniBiljku/${biljka.biljkaId}`, biljka);
      setMessage(response.data);
    } catch (error) {
      setMessage(error.response.data);
    }
  };
  const updateBiljkaID = (id) => {
    setBiljka(prevBiljka => ({ ...prevBiljka, biljkaId: id }));
  };
  
  const updateMessage = (msg) => {
    setMessage(msg);
  };
  const handleRemove = async event => {
    event.preventDefault();

    try {
        const response = await axios.put(`https://localhost:7193/Biljka/UkloniBiljku/${biljkaID}`);
        setRemoveMessage(response.data);
        setBiljkaID('');
      } catch (error) {
        setRemoveMessage(error.response.data);
      }};
  return (
    <div className="biljke">
    <form className="form" onSubmit={handleSubmit}>
    <p className="p">Unesi Bijlku:</p>
      <div className="form-group">
        <label>
          Sorta ID:
          <input type="text" name="sortaID" value={sortaID} onChange={event => setSortaID(event.target.value)} />
        </label>
      </div>
      <div className="form-group">
        <label>
          Biljka ID:
          <input type="text" name="biljkaId" value={biljka.biljkaId} onChange={handleChange} />
        </label>
      </div>
      <div className="form-group">
        <label>
          Naziv:
          <input type="text" name="naziv" value={biljka.naziv} onChange={handleChange} />
        </label>
      </div>
      <div className="form-group">
        <label>
          Slika biljke:
          <input type="text" name="slikaBiljke" value={biljka.slikaBiljke} onChange={handleChange} />
        </label>
      </div>
      <div className="form-group">
        <label>
          Cena:
          <input type="text" name="cena" value={biljka.cena} onChange={handleChange} />
        </label>
      </div>
      <div className="form-group">
        <label>
          Količina na stanju:
          <input type="text" name="kolicinaNaStanju" value={biljka.kolicinaNaStanju} onChange={handleChange} />
        </label>
      </div>
      <div className="form-group">
        <label>
          Deklaracija:
          <input type="text" name="deklaracija" value={biljka.deklaracija} onChange={handleChange} />
        </label>
      </div>
      <button type="submit">Unesi biljku</button>
    </form>
    <p>{message}</p>
    <form className="form" onSubmit={handleRemove}>
        <p className="p">Ukloni Biljku:</p>
  <div className="form-group">
    <label>
      ID biljke:
      <input type="text" name="biljkaID" value={biljkaID} onChange={event => setBiljkaID(event.target.value)} />
    </label>
  </div>
  <button type="submit">Ukloni biljku</button>
</form>
<p>{removeMessage}</p>
<form className="form" onSubmit={handleUpdate}>
    <p className="p">Izmeni Biljku:</p>
    <div className="form-group">
      <label>
        ID biljke:
        <input type="text" name="biljkaID" value={updateBiljkaID} onChange={event => setUpdateBiljkaID(event.target.value)} />
      </label>
    </div>
    <div className="form-group">
      <label>
        Naziv:
        <input type="text" name="naziv" value={updateBiljka.naziv} onChange={handleUpdateChange} />
      </label>
    </div>
    <div className="form-group">
      <label>
        Slika biljke:
        <input type="text" name="slikaBiljke" value={updateBiljka.slikaBiljke} onChange={handleUpdateChange} />
      </label>
    </div>
    <div className="form-group">
      <label>
        Cena:
        <input type="text" name="cena" value={updateBiljka.cena} onChange={handleUpdateChange} />
      </label>
    </div>
    <div className="form-group">
      <label>
        Količina na stanju:
        <input type="text" name="kolicinaNaStanju" value={updateBiljka.kolicinaNaStanju} onChange={handleUpdateChange} />
      </label>
    </div>
    <div className="form-group">
      <label>
        Deklaracija:
        <input type="text" name="deklaracija" value={updateBiljka.deklaracija} onChange={handleUpdateChange} />
      </label>
    </div>
    <button type="submit">Izmeni biljku</button>
  </form>
  <p>{updateMessage}</p>
  </div>
  );
}

export default BiljkeForma;

