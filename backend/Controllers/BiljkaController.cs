namespace FloraProjekat.Controllers{
//[Authorize]
[ApiController]
[Route("[controller]")]
public class BiljkaController : ControllerBase
{
    public FloraContext Context { get; set; }

    public BiljkaController(FloraContext context)
    {
        Context = context;
    }

    
    [AllowAnonymous]
    [HttpGet("VratiSveBiljke")]
    public async Task<ActionResult> VratiSveBiljke()
    {
        var biljke=await Context.Biljke.Include(p=>p.Cvecara).ToListAsync();
        //return Ok(await Context.Biljke.ToListAsync());
        return Ok(biljke);
    }

    //[Authorize(Role.Admin)]
    [HttpPut("IzmeniKolicinu/{novaKolicina}/{biljkaID}")]
    public async Task<ActionResult> IzmeniKolicinu(int novaKolicina, int biljkaID)
    {
        var biljka = await Context.Biljke.FindAsync(biljkaID);
      



        if(biljka != null)
        {
            biljka.KolicinaNaStanju = novaKolicina;
            Context.Biljke.Update(biljka);
            await Context.SaveChangesAsync();
            
            return Ok($"Biljka sa id-jem {biljka.BiljkaId} je uspesno izmenjena!");
        }
        else
        {
            return BadRequest("Biljka nije pronadjena!");
        }
    }


    //[Authorize(Role.Admin)]
    [HttpPut("IzmeniCenu/{novaCena}/{biljkaID}")]
    public async Task<ActionResult> IzmeniCenu(int novaCena, int biljkaID)
    {
        var biljka = await Context.Biljke.FindAsync(biljkaID);

        if(biljka != null)
        {
            biljka.Cena= novaCena;
            Context.Biljke.Update(biljka);
            await Context.SaveChangesAsync();
            
            return Ok($"Biljka sa id-jem {biljka.BiljkaId} je uspesno izmenjena!");
        }
        else
        {
            return BadRequest("Biljka nije pronadjena!");
        }
    }

    [Authorize(Role.Admin)]
    [Route("UnesiBiljku/{sortaID}/{cvecaraid}")]
    [HttpPost]

    public async Task<ActionResult> UnesiBiljku([FromBody]Biljka biljka, int sortaID, int cvecaraid)
    {
        if(biljka.BiljkaId <0)
        {
            return BadRequest("Nije validan id biljke.");
        }
        if(string.IsNullOrWhiteSpace(biljka.Naziv) || biljka.Naziv.Length > 30)
        {
            return BadRequest("Nije validan naziv biljke.");
        }

        try{
            var sorta = await Context.Sorte.FindAsync(sortaID);
             if(sorta==null)
             {
                return BadRequest("Ne postoji ta sorta!");
             }

            var cvecara = await Context.Cvecare.FindAsync(cvecaraid);
            if (cvecara == null)
            {
                return BadRequest("Cvecara ne postoji!!");
            }
            var biljkaa = new Biljka
            {
                Naziv = biljka.Naziv,
                SlikaBiljke = biljka.SlikaBiljke,
                Cena = biljka.Cena,
                KolicinaNaStanju = biljka.KolicinaNaStanju,
                Deklaracija = biljka.Deklaracija,
                Sorta = sorta, 
                Cvecara = cvecara
            }; 
          
            await Context.Biljke.AddAsync(biljkaa);
            await Context.SaveChangesAsync();
            return Ok($"Unete su {biljkaa.KolicinaNaStanju} biljaka: {biljkaa.BiljkaId}, sa nazivom {biljkaa.Naziv}");

        }
        catch(Exception e)
        {
            return BadRequest(e.Message);
        }

    }

    //[Authorize(Role.Admin)]
    [Route("UkloniBiljku/{biljkaID}")]
    [HttpPut]
    //Treba da se ispravi 

    public async Task<ActionResult> UkloniBiljku(int biljkaID)
    {
        if(biljkaID <0)
        {
            return BadRequest("Nije validan id biljke.");
        }

        var biljka=await Context.Biljke.FindAsync(biljkaID);
        if(biljka!=null)
        {
         Context.Biljke.Remove(biljka);
         await Context.SaveChangesAsync();
         return Ok($"Biljka sa ID-jem: {biljkaID} je uklonjena.");   
        }
        else
        {
            return BadRequest($"Biljka sa ID-jem: {biljkaID} ne postoji.");
        }
    }

   // [Authorize(Role.Admin)]
    [Route("IzmeniBiljku/{biljkaID}")]
    [HttpPut]
    //Treba da se ispravi 

    public async Task<ActionResult> IzmeniBiljku([FromBody]Biljka biljka, int biljkaID)
    {
        if(biljkaID <0)
        {
            return BadRequest("Nije validan id biljke.");
        }

        var biljka1=await Context.Biljke.FindAsync(biljkaID);
        if(biljka1!=null)
        {
            biljka1.Naziv = biljka.Naziv;
            biljka1.KolicinaNaStanju = biljka.KolicinaNaStanju;
            biljka1.Cena = biljka.Cena;
            biljka1.Deklaracija = biljka.Deklaracija;
            biljka1.SlikaBiljke = biljka.SlikaBiljke;

         Context.Biljke.Update(biljka1);
         await Context.SaveChangesAsync();
         return Ok($"Biljka sa ID-jem: {biljkaID} je izmenjena.");   
        }
        else
        {
            return BadRequest($"Biljka sa ID-jem: {biljkaID} ne postoji.");
        }
    }
    

   // [Authorize(Role.Admin)]
    [Route("DostupniBrojBiljaka/{NazivBiljke}")]
    [HttpGet]
    
    public async Task<ActionResult> DostupniBrojBiljaka(string NazivBiljke)
    {
        try{
            var dostupno = await Context.Biljke.Where(b=> b.Naziv==NazivBiljke)
            .Select(p => new
            {
                p.KolicinaNaStanju
            }).FirstOrDefaultAsync();
            return Ok($"Dostupno je takvih: {dostupno} biljaka.");
        }
        catch(Exception e)
        {
            return BadRequest(e.Message);
        }
    }

}
}