import React, { useEffect, useState } from 'react';

import jwtDecode from 'jwt-decode';

import './Footer.css';

function Footer() {
  const [ulogovan, setUlogovan] = useState(false);
  const [korisnikRola, setKorisnikRola] = useState('');
  const [korisnikIme, setKorisnikIme] = useState('');


  const decodeToken = (token) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.log('Greška prilikom dekodiranja tokena:', error);
      return null;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      setUlogovan(true);
      const decodedToken = jwtDecode(token);
      setKorisnikRola(decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]);
      setKorisnikIme(decodedToken["username"]);

    }
  }, []);

  return (
    <footer className="footer">
      <p className="fort">&copy; Rasadnik Flora uvek sa vama!</p>
      {ulogovan && <div className="footerdiv"> {korisnikRola} : {korisnikIme}</div>}
    </footer>
  );
}

export default Footer;

//ovo ako zelimo da uvezemo footer u drugu komponentu
// import React from 'react';
// import Footer from './Footer';

// function App() {
//   return (
//     <div>
//       <h1>Dobrodošli u moju aplikaciju</h1>
//       <p>Ovo je neki sadržaj...</p>
//       <Footer />
//     </div>
//   );
// }

// export default App;