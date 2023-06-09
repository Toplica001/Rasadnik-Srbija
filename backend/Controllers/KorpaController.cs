namespace FloraProjekat.Controllers;

//[Authorize]
[ApiController]
[Route("[controller]")]
public class KorpaController : ControllerBase
{
    public FloraContext Context { get; set; }

    public KorpaController(FloraContext context)
    {
        Context = context;
    }

   // [Authorize(Role.User)]
[HttpPost("DodajBiljkuUKorpu/{biljkaID}/{kolicina}/{korisnikName}")]
public async Task<ActionResult> DodajBiljkuUKorpu(int biljkaID, int kolicina, string korisnikName)
{
    var korisnik = await Context.Korisnici
        .FirstOrDefaultAsync(korisnik => korisnik.KorisnickoIme == korisnikName);   

    if (korisnik == null)
    {
        return Unauthorized();
    }

    var biljka = await Context.Biljke.FirstOrDefaultAsync(p => p.BiljkaId == biljkaID);
    //var biljka = await Context.Biljke.FindAsync(biljkaID);
    if (biljka == null)
    {
        return NotFound();
    }
    if(biljka.KolicinaNaStanju < kolicina)
    {
        return BadRequest($"Nema dovoljno kolicine na stanju. Dostupna kolicina izabrane biljke je {biljka.KolicinaNaStanju}.");
    }

    var korpe = await Context.Korpe
    .Where(p => p.Korisnik!.KorisnikId == korisnik.KorisnikId && p.Biljka!.BiljkaId == biljka.BiljkaId).FirstOrDefaultAsync();
    if(korpe != null)
    {
        return BadRequest("Vec ste uneli zadatu biljku!");
    }

    var korpa = new Korpa
    {
        KolicinaProizvoda = 0,
        Korisnik = korisnik,
        Biljka = biljka
    };
    await Context.Korpe.AddAsync(korpa);
    
    korpa.KolicinaProizvoda += kolicina;
    await Context.SaveChangesAsync();

    return Ok($"Dodata je biljka sa id-jem {biljka.BiljkaId} sa kolicinom {kolicina}.");
}
    // [HttpPost("DodajBiljkuUKorpu/{biljkaID}/{kolicina}/{userName}")]
    // public async Task<ActionResult> DodajBiljkuUKorpu(int biljkaID, int kolicina,string userName)
    // {
    //     //var userName = User.FindFirstValue(ClaimTypes.Name);
    //     var korisnik = await Context.Korisnici
    //     .FirstOrDefaultAsync(korisnik => korisnik.KorisnickoIme == userName);

    //     if(korisnik == null)
    //     {
    //         return Unauthorized();
    //     }

    //     var biljka = await Context.Biljke.FindAsync(biljkaID);
    //     if(biljka == null)
    //     {
    //         return NotFound();
    //     }

    //     var korpa = await Context.Korpe.FirstOrDefaultAsync(p => p.Korisnik!.KorisnikId == korisnik!.KorisnikId);
    //     if(korpa!=null)
    //        if(korpa!.Korisnik!.KorisnikId == korisnik!.KorisnikId)
    //         {
    //              await Context.Korpe.AddAsync(korpa);
    //         if(korpa == null)
    //         {
    //             korpa = new Korpa
    //             {
    //                 KolicinaProizvoda = 0,
    //                 Korisnik = korisnik
    //             };
    //             await Context.Korpe.AddAsync(korpa);
    //         }
    //     }
    //     else{
             
    //             korpa = new Korpa
    //             {
    //                 KolicinaProizvoda = 0,
    //                 Korisnik = korisnik
    //             };
    //             await Context.Korpe.AddAsync(korpa);
            
    //     }
    //     korpa.Biljka!.Add(biljka);
    //     korpa.KolicinaProizvoda += kolicina;
    //     await Context.SaveChangesAsync();

    //     return NoContent();
    // }

    //[Authorize(Role.User)]
    [HttpDelete("UkloniBiljkuIzKorpe/{biljkaID}/{userName}")]
    public async Task<ActionResult> UkloniBiljkuIzKorpe(int biljkaID, string userName)
    {
        //var userName = User.FindFirstValue(ClaimTypes.Name);
        var korisnik = await Context.Korisnici
        .FirstOrDefaultAsync(korisnik => korisnik.KorisnickoIme == userName);

        if(korisnik == null)
        {
            return Unauthorized();
        }

        var biljka = await Context.Biljke.FirstOrDefaultAsync(p => p.BiljkaId == biljkaID);
        if(biljka == null)
        {
            return NotFound();
        }

        var korpa = await Context.Korpe.FirstOrDefaultAsync(p => p!.Korisnik!.KorisnikId == korisnik.KorisnikId && p!.Biljka!.BiljkaId == biljka.BiljkaId);
        if(korpa == null)
        {
            return NotFound();
        }

        biljka.Korpa!.Remove(korpa);
        korpa.KolicinaProizvoda = 0;
        await Context.SaveChangesAsync();

        return NoContent();
        
    }

   // [Authorize(Role.User)]
   
    [HttpGet("PrikaziSveBiljkeUKorpi/{userName}")]
    public async Task<ActionResult> PrikaziSveBiljkeUKorpi(string userName)
    {
       // var userName = User.FindFirstValue(ClaimTypes.Name);
        var korisnik = await Context.Korisnici
        .FirstOrDefaultAsync(korisnik => korisnik.KorisnickoIme == userName);

        if(korisnik == null)
        {
            return Unauthorized();
        }

        var korpa = await Context.Korpe.Include(p => p.Biljka)
        .Where(p => p.Korisnik!.KorisnikId == korisnik.KorisnikId && p.KolicinaProizvoda != 0)
        .Select(p => new {
            p.Biljka,
            p.KolicinaProizvoda
        }).ToListAsync();
        
        if(korpa == null)
        {
            return NotFound();
        }

        return Ok(korpa);
    }

   // [Authorize(Role.User)]
   [HttpDelete("UkloniKorpu/{userName}")]
public async Task<ActionResult> UkloniKorpu(string userName)
{
    var korisnik = await Context.Korisnici
        .FirstOrDefaultAsync(korisnik => korisnik.KorisnickoIme == userName);

    if (korisnik == null)
    {
        return Unauthorized();
    }

    var korpa = await Context.Korpe.Where(p => p.Korisnik!.KorisnikId == korisnik.KorisnikId).ToListAsync();

    if (korpa.Count == 0)
    {
        return NotFound();
    }

    foreach (var k in korpa)
    {
        if (k.Korisnik!.KorisnikId == korisnik.KorisnikId)
        {
            Context.Korpe.Remove(k);
        }
    }

    await Context.SaveChangesAsync();

    return NoContent();
}


   // [Authorize(Role.User)]
    [HttpPut("IzmeniKolicinuUKorpi/{biljkaID}/{kolicina}/{userName}")]
    public async Task<ActionResult> IzmeniKolicinuUKorpi(int biljkaID, int kolicina,string userName)
    {
       // var userName = User.FindFirstValue(ClaimTypes.Name);
        var korisnik = await Context.Korisnici
        .FirstOrDefaultAsync(korisnik => korisnik.KorisnickoIme == userName);

        if(korisnik == null)
        {
            return Unauthorized();
        }
        var biljka = await Context.Biljke.FirstOrDefaultAsync(p => p.BiljkaId == biljkaID);

        if(biljka == null)
        {
            return NotFound();
        }
        if(biljka.KolicinaNaStanju < kolicina)
        {
             return BadRequest($"Nema dovoljno kolicine na stanju. Dostupna kolicina izabrane biljke je {biljka.KolicinaNaStanju}.");
        }

        var korpa = await Context.Korpe.FirstOrDefaultAsync(p => p.Biljka!.Naziv == biljka.Naziv && p.Korisnik!.KorisnickoIme == userName);
        if(korpa == null)
        {
            return NotFound();
        }
        
        //ne moze da nadje biljkuID ulist biljke kao da nije ni dodato
        
        if(korpa.Korisnik!.KorisnikId == korisnik.KorisnikId)
        {
            korpa.KolicinaProizvoda = kolicina;
            await Context.SaveChangesAsync();
        }
        
        return NoContent();
    }

/*[HttpPost("DodajBiljkuUKorpu/{biljkaNaziv}/{kolicina}/{korisnikName}/{grad}")]
public async Task<ActionResult> DodajBiljkuUKorpu(string biljkaNaziv, int kolicina, string korisnikName, string grad)
{
    var korisnik = await Context.Korisnici
        .FirstOrDefaultAsync(korisnik => korisnik.KorisnickoIme == korisnikName);

    var gradCvecara = await Context.Gradovi
        .Include(g => g.GradCvecara)
        .FirstOrDefaultAsync(g => g.NazivGrada == grad);

    if (korisnik == null)
    {
        return Unauthorized();
    }

    if (gradCvecara == null)
    {
        return NotFound($"Grad sa nazivom {grad} nije pronađen.");
    }

    var cvecara = gradCvecara.GradCvecara?.FirstOrDefault()?.Cvecara;

    if (cvecara == null)
    {
        return NotFound($"U gradu {grad} nije pronađena cvećara.");
    }

    var biljka = cvecara.Biljkee?.FirstOrDefault(b => b.Naziv == biljkaNaziv);

    if (biljka == null)
    {
        return NotFound($"Biljka sa nazivom {biljkaNaziv} nije pronađena u cvećari.");
    }

    if (biljka.KolicinaNaStanju < kolicina)
    {
        return BadRequest($"Nema dovoljno količine na stanju. Dostupna količina izabrane biljke je {biljka.KolicinaNaStanju}.");
    }

    var korpe = await Context.Korpe
        .Where(p => p.Korisnik!.KorisnikId == korisnik.KorisnikId && p.Biljka!.BiljkaId == biljka.BiljkaId)
        .FirstOrDefaultAsync();

    if (korpe != null)
    {
        return BadRequest("Već ste uneli zadatu biljku!");
    }

    var korpa = new Korpa
    {
        KolicinaProizvoda = 0,
        Korisnik = korisnik,
        Biljka = biljka
    };

    await Context.Korpe.AddAsync(korpa);
    korpa.KolicinaProizvoda += kolicina;
    await Context.SaveChangesAsync();

    return Ok($"Dodato je biljka sa ID-jem {biljka.BiljkaId} sa količinom {kolicina}.");
}*/
}
