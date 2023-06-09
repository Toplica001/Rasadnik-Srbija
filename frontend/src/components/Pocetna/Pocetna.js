import React from 'react';
import './Pocetna.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';

//import dipladenija_svetlo_roze from '../Slike/dipladenija_svetlo_roze.JPG';
import pocetna1 from '../Slike/pocetna1.JPG';
import pocetna2 from '../Slike/pocetna2.JPG';
import pocetna3 from '../Slike/pocetna3.JPG';
import pocetna4 from '../Slike/pocetna4.JPG';
import jednogodisnje from '../Slike/jednogodisnje.JPG';
import visegodisnje from '../Slike/visegodisnje.JPG';
import cetinari from '../Slike/cetinari.JPG';
import liscari from '../Slike/liscari.JPG';
import zacinsko from '../Slike/zacinsko.JPG';
import lekovito from '../Slike/lekovito.jpg';






const Pocetna = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  
  return (
    <div className="pocetna">
      <div className="pocetna-slika"></div>
      <h1 className="h">Dobrodosli dragi bastovani!</h1>
      <Slider {...settings} className="s">
        <div>
        <img className="src" src={pocetna2} alt="pocetna 2" />
        </div>
        <div>
          <img className="src" src={pocetna1} alt="pocetna 1" />
        </div>
        <div>
        <img className="src" src={pocetna3} alt="pocetna 3" />
        </div>
        <div>
        <img className="src" src={pocetna4} alt="pocetna 4" />
        </div>
      </Slider>
      <div className="slike">
        <div className="slika">
          <Link to="/biljke"><img src={jednogodisnje} alt="jednogodisnje" className="okrugla-slika" /></Link>
          <h3 className="naslov"><Link to="/biljke">Jednogodisnje biljke</Link></h3>
          <p className="opis">Ove biljke su sezonske, sto znaci da im je rok trajanja jedna godina i
           ukoliko se opredelite za ovu vrstu cveca, budite spremni da svake godine obnavljate kupovinu istih.
            Prednost ove vrste je sto zaista pruza primaljiviji izgled nego bilo koja druga vrsta.</p>
        </div>
        <div className="slika">
          <Link to="/biljke"><img src={visegodisnje} alt="visegodisnje" className="okrugla-slika" /></Link>
          <h3 className="naslov"><Link to="/biljke">Visegodisnje biljke</Link></h3>
          <p className="opis">Ove biljke su uglavnom one koje sadrze lukovicu i mogu se zasaditi u basti ili su to sobne 
          biljke. Prednost ovih biljaka je sto se "jednom" kupuju, ali teze su za odrzavanje</p>
        </div>
        <div className="slika">
          <Link to="/biljke"><img src={cetinari} alt="cetinari" className="okrugla-slika" /></Link>
          <h3 className="naslov"><Link to="/biljke">Cetinari</Link></h3>
          <p className="opis">Ovu su zimzelene biljke koje uglavnom ukrasavaju parkove i 
          dvorista. Sve vise zamenjuju jednogodisnje i visegodisnje biljke, jer se veoma lake za odrzavanje i izdrzljive</p>
        </div>
        <div className="slika">
          <Link to="/biljke"><img src={liscari} alt="liscari" className="okrugla-slika" /></Link>
          <h3 className="naslov"><Link to="/biljke">Liscari</Link></h3>
          <p className="opis">Ovu su biljke koje imaju drvenasto stablo i uglavnom se nalaze kao drvoredi pored 
          puta. Takodje, prednost je ista kao i kod cetinara, cak su i za nijansu lakse za odrzavanje.</p>
        </div>
        <div className="slika">
          <Link to="/biljke"><img src={lekovito} alt="lekovito" className="okrugla-slika" /></Link>
          <h3 className="naslov"><Link to="/biljke">Lekovito bilje</Link></h3>
          <p className="opis">Ovu su biljke koje se retko gaje po rasadnicima, vec ih cvecari pronalaze u sumi
           ili na livadama i presadjuju ih za prodaju. Koriste se za pravljenje cajeva kao i drugih lekovitih napitaka i melema.</p>
        </div>
        <div className="slika">
          <Link to="/biljke"><img src={zacinsko} alt="zacinsko" className="okrugla-slika" /></Link>
          <h3 className="naslov"><Link to="/biljke">Zacinsko bilje</Link></h3>
          <p className="opis">Vrsta biljaka koja se cesto srece u jelima i daje karakteristican ukus
           hrani. Vrlo im je izrazen miris, pa ih kupci zadrzavaju i kako bi osvezili prostorije.</p>
        </div>
      </div>
      <div className="pocetna-smernice">
  <h2 className="h2">Kako se kretati kroz sajt:</h2>
  <p>Nalazite se na pocetnoj stranici, gde mozete pogledati neke kadrove iz nasih rasadnika.</p>
  <p>Takodje na slikama iznad imate linkove na svaku od kategorija biljaka, ukoliko zelite saznati nesto novo o svakoj od njih.</p>
  <div className="dugmici">
  <p>Ukoliko nemate nalog ili niste prijavljeni mozete to uciniti klikom na dugme ispod.</p>
    <button onClick={() => { window.location.href = '/registracijaiulogovanje'; }} className="dugmep">Registracija i ulogovanje</button>
    <p>I takodje, mozete razgledati nasu ponudu na stranici biljaka i uzivati u ponudi i ako ste samo gosti,</p>
    <button onClick={() => { window.location.href = '/biljke'; }} className="dugmep">Dostupne biljke po nasim cvecarama</button>
    <p>Ukoliko zelite da odaberete biljke za sebe, mozete to uciniti na stranici klikom ispod.</p>
    <button onClick={() => { window.location.href = '/cvecare'; }} className="dugmep">Filtriraj biljke i poruci</button>
  </div>
</div>
    </div>
  );
};

export default Pocetna;