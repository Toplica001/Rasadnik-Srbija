using System.Net.Mail;

namespace FloraProjekat.Controllers;
//[Authorize]
[ApiController]
[Route("[controller]")]
public class PorudzbinaController : ControllerBase
{
    public FloraContext Context { get; set; }


    public PorudzbinaController(FloraContext context)
    {
        Context = context;
    }

    //[Authorize(Role.User)]
[HttpPost("PoruciBiljke/{adresa}/{userName}")]
public async Task<ActionResult> PoruciBiljke(string adresa, string userName)
{
    if (adresa == null || userName == null)
    {
        return BadRequest("Nedostaju parametri adresa i/ili userName.");
    }

    var korisnik = await Context.Korisnici.FirstOrDefaultAsync(korisnik => korisnik.KorisnickoIme == userName);

    var korpa = await Context.Korpe
        .Include(k => k.Biljka)
        .Where(k => k.Korisnik != null && k.Korisnik.KorisnikId == korisnik!.KorisnikId)
        .ToListAsync();

    var korpaCenaBiljke = new List<int>();
    var korpaKolicina = new List<int>();

    foreach (var korpaStavka in korpa)
    {
        var biljka = korpaStavka.Biljka;
        if (biljka != null)
        {
            korpaCenaBiljke.Add(biljka.Cena);
            korpaKolicina.Add(korpaStavka.KolicinaProizvoda);

            biljka.KolicinaNaStanju -= korpaStavka.KolicinaProizvoda;
        }
    }

    if (korpaCenaBiljke.Count == 0 || korpaKolicina.Count == 0)
    {
        return BadRequest("Korpa je prazna ili ne postoji!");
    }

    int ukupnaCena = korpaCenaBiljke.Zip(korpaKolicina, (cena, kolicina) => cena * kolicina).Sum();
    int brojBiljaka = korpaKolicina.Sum();

    var porudzbina = new Porudzbina
    {
        AdresaKupca = adresa,
        BrojBiljaka = brojBiljaka,
        Korpa = korpa,
        Korisnik = korisnik,
        UkupnaCena = ukupnaCena
    };

    Context.Porudzbine.Add(porudzbina);

    foreach (var stavka in korpa)
    {
        Context.Korpe.Remove(stavka);
    }

    await Context.SaveChangesAsync();

    return Ok(porudzbina);
} 

    [HttpGet("VratiPorudzbine/{userName}")]
    public async Task<ActionResult> VratiPorudzbine(string userName)
    {
        var korisnik = await Context.Korisnici.FirstOrDefaultAsync(p => p.KorisnickoIme == userName);
        if(korisnik == null)
        {
            return NotFound();
        }

        var porudzbine = await Context.Porudzbine
        .Where(p => p.Korisnik!.KorisnikId == korisnik!.KorisnikId).ToListAsync();
        return Ok(porudzbine);
    }

    // [HttpPost("PoruciBiljke/{adresa}/{userName}")]
    // public async Task<ActionResult> PoruciBiljke(string adresa, string userName)
    // {
    //     if (string.IsNullOrEmpty(adresa) || string.IsNullOrEmpty(userName))
    //     {
    //         return BadRequest("Adresa i korisničko ime su obavezni.");
    //     }

    //     var korisnik = await Context.Korisnici
    //         .FirstOrDefaultAsync(korisnik => korisnik.KorisnickoIme == userName);

    //     if (korisnik == null)
    //     {
    //         return NotFound($"Korisnik sa korisničkim imenom {userName} nije pronađen.");
    //     }

    //     var korpa = await Context.Korpe
    //         .Include(p => p.Biljka)
    //         .Where(p => p.Korisnik!.KorisnikId == korisnik.KorisnikId)
    //         .ToListAsync();

    //     if (korpa.Count == 0)
    //     {
    //         return BadRequest("Korpa je prazna ili ne postoji.");
    //     }

    //     var korpaCenaBiljke = korpa.Select(p => p.Biljka!.Cena).ToList();
    //     var korpaKolicina = korpa.Select(p => p.KolicinaProizvoda).ToList();

    //     var porudzbina = new Porudzbina
    //     {
    //         AdresaKupca = adresa,
    //         BrojBiljaka = korpaKolicina.Sum(),
    //         Korpa = korpa,
    //         Korisnik = korisnik,
    //         UkupnaCena = 0
    //     };

    //     foreach (var stavka in korpa)
    //     {
    //         var biljka = await Context.Biljke.FindAsync(stavka.Biljka!.BiljkaId);
    //         if (biljka != null)
    //         {
    //             biljka.KolicinaNaStanju -= stavka.KolicinaProizvoda;
    //             porudzbina.UkupnaCena += biljka.Cena * stavka.KolicinaProizvoda;
    //         }
    //     }

    //     await Context.Porudzbine.AddAsync(porudzbina);
    //     Context.Korpe.RemoveRange(korpa);

    //     try
    //     {
    //         await Context.SaveChangesAsync();
    //     }
    //     catch (Exception)
    //     {
    //         return StatusCode(StatusCodes.Status500InternalServerError, "Došlo je do greške prilikom čuvanja porudžbine.");
    //     }

    //     // Slanje e-pošte adminu
    //     var adminEmail = "sajko8699@gmail.com"; // Enter the admin's email here
    //     var emailSubject = "Nova porudžbina";
    //     var emailBody = $"Nova porudžbina je primljena.\nAdresa: {adresa}\nBroj biljaka: {porudzbina.BrojBiljaka}\nUkupna cena: {porudzbina.UkupnaCena} RSD";

    //     using (var smtpClient = new SmtpClient("smtp.gmail.com", 587))
    //     {
    //         smtpClient.EnableSsl = true;
    //         smtpClient.Credentials = new NetworkCredential("toplica@elfak.rs", "Brotherhood56@");

    //         try
    //         {
    //             using (var mailMessage = new MailMessage("toplica@elfak.rs", adminEmail, emailSubject, emailBody))
    //             {
    //                 await smtpClient.SendMailAsync(mailMessage);
    //             }
    //         }
    //         catch (Exception ex)
    //         {
    //             Console.WriteLine($"Error sending email: {ex.Message}");
    //             return StatusCode(StatusCodes.Status500InternalServerError, "Došlo je do greške prilikom slanja e-pošte.");
    //         }
    //     }

    //         return Ok(porudzbina);
    // }
}
