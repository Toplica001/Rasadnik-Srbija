namespace FloraProjekat.Controllers;
//[Authorize]
[ApiController]
[Route("[controller]")]
public class OcenaFirmeController : ControllerBase
{
    public FloraContext Context { get; set; }

    public OcenaFirmeController(FloraContext context)
    {
        Context = context;
    }

    //[Authorize(Role.User)]
[HttpPost("OceniCvecaru/{cvecaraNaziv}/{ocena}/{userName}")]
public async Task<ActionResult> OceniCvecaru(string cvecaraNaziv, int ocena, string userName)
{
    var korisnik = await Context.Korisnici
        .Include(k => k.OcenaFirme)
        .FirstOrDefaultAsync(k => k.KorisnickoIme == userName);

    if (korisnik == null)
    {
        return Unauthorized();
    }

    var cvecara = await Context.Cvecare
        .Include(c => c.OcenaFirme)
        .FirstOrDefaultAsync(c => c.NazivCvecare == cvecaraNaziv);

    if (cvecara == null)
    {
        return BadRequest("Cvecara ne postoji!");
    }

    if (ocena < 1 || ocena > 5)
    {
        return BadRequest("Ocena mora da bude izmedju 1 i 5!");
    }

    // Provera da li korisnik vec ocenjuje cvecaru sa istim ID-jem
    if(korisnik.OcenaFirme!=null)
    {

    
    var prethodnaOcena = korisnik.OcenaFirme.FirstOrDefault(o=> o.Cvecara != null && o.Cvecara.CvecaraId == cvecara.CvecaraId);
    if (prethodnaOcena != null)
    {
        Context.OceneFirme.Remove(prethodnaOcena);
    }
    }
    

    var ocenaFirme = new OcenaFirme
    {
        Ocena = ocena,
        Cvecara = cvecara,
        Korisnik = korisnik
    };

    await Context.OceneFirme.AddAsync(ocenaFirme);
    await Context.SaveChangesAsync();

    return Ok("Uspesno ste ocenili cvecaru!");
}
    [HttpGet("SrednjaOcenaCvecare/{cvecaraID}")]
public async Task<ActionResult<double>> SrednjaOcenaCvecare(int cvecaraID)
{
    var ocene = await Context.OceneFirme
        .Where( p=> p.Cvecara!.CvecaraId == cvecaraID)
        .Select(p => p.Ocena) 
        .ToListAsync();
    

    // if (ocene.Count == 0)
    // {
    //     return NotFound("Cvecara nije ocenjena.");
    // }

    double srednjaOcena =0;
    srednjaOcena= ocene.Average();

    return Ok(srednjaOcena);
}
}
