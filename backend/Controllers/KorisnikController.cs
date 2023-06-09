

//using flora.controller;

namespace FloraProjekat.Controllers;

    //[Authorize]
    [ApiController]
    [Route("[controller]")]
    public class KorisnikController : ControllerBase
    {
        public FloraContext Context { get; set; }
       // private IUserService _userService;

        public KorisnikController(FloraContext context/*, IUserService userService*/)
        {
            Context = context;
           // _userService = userService;
        }

    /*[AllowAnonymous]
    [HttpPost("DodajKorisnika")]
    public async Task<ActionResult> DodajKorisnika([FromBody]Korisnik korisnik)
    {

        if(string.IsNullOrWhiteSpace(korisnik.ImeKorisnika) || korisnik.ImeKorisnika.Length > 20)
        {
            return BadRequest("Pogresno ime!");
        }
        if(string.IsNullOrWhiteSpace(korisnik.PrezimeKorisnika) || korisnik.PrezimeKorisnika.Length > 20)
        {
            return BadRequest("Pogresno prezime!");
        }
        try
        {
            korisnik.TipKorisnika = flora.controller.Role.User;
           //return BadRequest("nista");
        
            await Context.Korisnici.AddAsync(korisnik);
            await Context.SaveChangesAsync();
            return Ok($"Dodat je korisnik sa id-jem: {korisnik.KorisnikId}");
        }
        catch(Exception e)
        {
            return BadRequest(e.Message);
        }
    }*/

    //[Authorize]
    [HttpPut("IzmeniMail/{email}/{korisnikID}")]
    public async Task<ActionResult> IzmeniMail(string email, int korisnikID)
    {
        var stariMail = await Context.Korisnici.FindAsync(korisnikID);

        if(stariMail != null)
        {
            stariMail.EmailKorisnika = email;
            Context.Korisnici.Update(stariMail);
            await Context.SaveChangesAsync();

            return Ok($"Email korisnika sa id-jem {stariMail.KorisnikId} je uspesno izmenjen!");
        }
        else
        {
            return BadRequest("Korisnik nije pronadjen!");
        }
    }

    //[Authorize(Role.User)]
    [HttpPut("IzmeniSifru/{sifra}/{korisnikID}")]
    public async Task<ActionResult> IzmeniSifru(string sifra, int korisnikID)
    {
        var staraSifra = await Context.Korisnici.FindAsync(korisnikID);

        if(staraSifra != null)
        {
            staraSifra.SifraKorisnika = sifra;
            Context.Korisnici.Update(staraSifra);
            await Context.SaveChangesAsync();
            
            return Ok($"Sifra korisnika sa id-jem {staraSifra.KorisnikId} je uspesno izmenjena!");
        }
        else
        {
            return BadRequest("Korisnik nije pronadjen!");
        }
    }

    //[Authorize(Role.User)]
    [HttpPut("IzmeniKorisnickoIme/{korisnickoIme}/{korisnikID}")]
    public async Task<ActionResult> IzmeniKorisnickoIme(string korisnickoIme, int korisnikID)
    {
        var staroIme = await Context.Korisnici.FindAsync(korisnikID);

        if(staroIme != null)
        {
            staroIme.KorisnickoIme = korisnickoIme;
            Context.Korisnici.Update(staroIme);
            await Context.SaveChangesAsync();
            
            return Ok($"Korisnicko ime korisnika sa id-jem {staroIme.KorisnikId} je uspesno izmenjeno!");
        }
        else
        {
            return BadRequest("Korisnik nije pronadjen!");
        }
    }

    //[Authorize(Role.User)]
    [HttpPut("IzmeniImeIPrezime/{ime}/{prezime}/{korisnikID}")]
    public async Task<ActionResult> IzmeniImeIPrezime(string ime, string prezime, int korisnikID)
    {
        var staroIme = await Context.Korisnici.FindAsync(korisnikID);

        if(staroIme != null)
        {
            staroIme.ImeKorisnika = ime;
            staroIme.PrezimeKorisnika = prezime;
            Context.Korisnici.Update(staroIme);
            await Context.SaveChangesAsync();
            
            return Ok($"Ime i prezime korisnika sa id-jem {staroIme.KorisnikId} su uspesno izmenjeni!");
        }
        else
        {
            return BadRequest("Korisnik nije pronadjen!");
        }
    }

   // [Authorize(Role.Admin)]
    [HttpDelete("UkloniKorisnika/{korisnikID}")]
    public async Task<ActionResult> UkloniKorisnika(int korisnikID)
    {
        var korisnik = await Context.Korisnici.FindAsync(korisnikID);
        if(korisnik == null)
        {
            return BadRequest("Korisnik ne postoji!");
        }

        string? email = korisnik.EmailKorisnika;
        Context.Korisnici.Remove(korisnik);
        await Context.SaveChangesAsync();
        return Ok($"Korisnik sa email-om {email} je uspesno obrisan!");
    }

   // [AllowAnonymous]
    [HttpPost("RegistrujSe")]
    public async Task<ActionResult> RegistrujSe([FromBody] Korisnik korisnik)
    {
        if (string.IsNullOrEmpty(korisnik.ImeKorisnika))
        {
            return BadRequest("Zaboravili ste da unesete ime!");
        }
        if (string.IsNullOrEmpty(korisnik.PrezimeKorisnika))
        {
            return BadRequest("Zaboravili ste da unesete prezime!");
        }
        if (string.IsNullOrEmpty(korisnik.EmailKorisnika))
        {
            return BadRequest("Zaboravili ste da unesete email!");
        }
        if (korisnik.SifraKorisnika?.Length < 8)
        {
            return BadRequest("Sifra mora da ima minimum 8 karaktera!");
        }
        if (string.IsNullOrEmpty(korisnik.AdresaKorisnika))
        {
            return BadRequest("Zaboravili ste da unesete adresu!");
        }

        var korisnikIme = await Context.Korisnici.Where(p => p.KorisnickoIme == korisnik.KorisnickoIme).FirstOrDefaultAsync();
        if (korisnikIme != null)
        {
            return BadRequest("Korisnik sa unetim korisnickim imenom vec postoji!");
        }

        try
        {
            korisnik.TipKorisnika = Role.User;

            // Kreiranje salt-a za lozinku
            byte[] salt = new byte[16];
            RandomNumberGenerator.Fill(salt);

            // Kreiranje derivacijskog ključa
            var iterations = 10000;
            var hashAlgorithm = HashAlgorithmName.SHA256; // Or use a different hash algorithm if preferred

            var pbkdf2 = new Rfc2898DeriveBytes(korisnik.SifraKorisnika, salt, iterations, hashAlgorithm);

            // Kreiranje ključa za enkripciju
            byte[] hash = pbkdf2.GetBytes(20);
            byte[] kljuc = new byte[36];
            Array.Copy(salt, 0, kljuc, 0, 16);
            Array.Copy(hash, 0, kljuc, 16, 20);
            string enkriptovanaSifra = Convert.ToBase64String(kljuc);

            korisnik.SifraKorisnika = enkriptovanaSifra;

            await Context.Korisnici.AddAsync(korisnik);
            await Context.SaveChangesAsync();
            var korisnikKI = await Context.Korisnici.Where(p => p.KorisnickoIme == korisnik.KorisnickoIme).FirstOrDefaultAsync();
            return Ok("Registrovan je korisnik sa id-jem: "+korisnikKI?.KorisnikId);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }


   // [AllowAnonymous]
[HttpPost("UlogujSe/{korisnickoIme}/{sifra}")]
public async Task<ActionResult> UlogujSe(string korisnickoIme, string sifra)
{
    var korisnik = await Context.Korisnici.SingleOrDefaultAsync(x => x.KorisnickoIme == korisnickoIme);
    if (korisnik == null)
    {
        return BadRequest("Pogrešno korisničko ime ili lozinka!");
    }

    var enkriptovanaSifra = korisnik.SifraKorisnika;

    byte[] kljuc = Convert.FromBase64String(enkriptovanaSifra);
    byte[] salt = new byte[16];
    Array.Copy(kljuc, 0, salt, 0, 16);

    var iterations = 10000;
    var hashAlgorithm = HashAlgorithmName.SHA256;

    var pbkdf2 = new Rfc2898DeriveBytes(sifra, salt, iterations, hashAlgorithm);

    byte[] hash = pbkdf2.GetBytes(20);
    byte[] testKljuc = new byte[36];
    Array.Copy(salt, 0, testKljuc, 0, 16);
    Array.Copy(hash, 0, testKljuc, 16, 20);
    string testEnkriptovanaSifra = Convert.ToBase64String(testKljuc);

    if (testEnkriptovanaSifra == enkriptovanaSifra)
    {
        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.NameIdentifier, korisnik.KorisnikId.ToString()),
            new Claim(ClaimTypes.Role, korisnik.TipKorisnika.ToString()),
            new Claim("username", korisnickoIme)
            // Dodajte ostale tvrdnje (claims) koje želite uključiti u JWT token
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("Moj1tajni2kljuc3niko4ne5znaMoj1tajni2kljuc3niko4ne5zna"));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var tokenOptions = new JwtSecurityToken(
            issuer: "Flora1Tim",
            audience: "Cvecari1sirom2zemlje",
            claims: claims,
            expires: DateTime.Now.AddHours(1),
            signingCredentials: creds
        );

        var generatedToken = new JwtSecurityTokenHandler().WriteToken(tokenOptions);

        return Ok(new { token = generatedToken });
    }
    else
    {
        return BadRequest("Pogrešno korisničko ime ili lozinka!");
    }
}





















    //[Authorize(Role.Admin)]
    [HttpGet("PreuzmiKorisnike")]
    public async Task<ActionResult> PreuzmiKorisnike()
    {
        return Ok(await Context.Korisnici.ToListAsync());
    }

}

   
