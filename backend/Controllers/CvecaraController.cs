namespace FloraProjekat.Controllers{
//[Authorize]
[ApiController]
[Route("[controller]")]
public class CvecaraController : ControllerBase
{
    public FloraContext Context { get; set; }

    public CvecaraController(FloraContext context)
    {
        Context = context;
    }

   

    [Route("VratiSveCvecare")]
    [HttpGet]

    public async Task<ActionResult> VratiSveCvecare()
    {
        try{
            var cvecare=await Context.Cvecare.ToListAsync();
            return Ok(cvecare);
        }
        catch(Exception e)
        {
            return BadRequest("Trenutno nema nijedna cvecara u aplikaciji."+ e.Message);
        }
    }

//[Authorize(Role.User)]
[Route("VratiCvecarePoGradu/{NazivGrada}")]
[HttpGet]
public async Task<ActionResult> VratiSveCvecare(string NazivGrada)
{
    var cvecare = await Context.GradCvecare
                                 .Where(gc => gc.Grad!.NazivGrada == NazivGrada)
                                 .Select(gc => gc.Cvecara)
                                 .ToListAsync();

    return Ok(cvecare);
}

//[Authorize(Role.User)]
// [Route("VratiCvecareKojeSadrzeBiljku/{NazivBiljke}")]
// [HttpGet]
// public async Task<ActionResult> VratiSveCvecareKojeSadrzeBiljku(string NazivBiljke)
// {
//     // Pronalazimo biljku u bazi podataka po nazivu
//     var biljka = await Context.Biljke.FirstOrDefaultAsync(x => x.Naziv == NazivBiljke);

//     if (biljka == null)
//     {
//         return NotFound("Tražena biljka nije pronađena.");
//     }

//     // Pronalazimo sve cvjećare koje prodaju ovu biljku
//         var cvecare = await Context.Cvecare
//         .Include(c => c.Biljkee!.Where(b => b.Naziv == NazivBiljke))
//         .ToListAsync();

//     return Ok(cvecare);
// }
[Route("VratiCvecareKojeSadrzeBiljku/{NazivBiljke}")]
[HttpGet]
public async Task<ActionResult> VratiSveCvecareKojeSadrzeBiljku(string NazivBiljke)
{
    // Pronalazimo biljku u bazi podataka po nazivu
    var biljka = await Context.Biljke.FirstOrDefaultAsync(x => x.Naziv == NazivBiljke);

    if (biljka == null)
    {
        return NotFound("Tražena biljka nije pronađena.");
    }

    // Pronalazimo sve cvjećare koje prodaju ovu biljku
    var cvecare = await Context.Cvecare
        .Where(c => c.Biljkee!.Any(b => b.Naziv == NazivBiljke))
        .ToListAsync();

    return Ok(cvecare);
}
    //[Authorize(Role.Admin)]
    [Route("IzbrisiCvecaru/{CvecaraID}")]
    [HttpDelete]

    public async Task<ActionResult> IzbrisiCvecaru(int CvecaraID)
    {
        if(CvecaraID<=0)
        {
            return BadRequest("Los id cvecare!");
        }
        try{
            var cvecara=await Context.Cvecare.FindAsync(CvecaraID);
            if(cvecara==null)
            {
                return BadRequest("Cvecara ne postoji!");
            }
            Context.Cvecare.Remove(cvecara);
            await Context.SaveChangesAsync();
            return Ok("Obrisana je cvecara sa ID-jem: "+CvecaraID+".");
        }
        catch(Exception e)
        {
            return BadRequest(e.Message);
        }
    }


     [Authorize(Role.Admin)]
    [HttpPost("UnesiCvecaru/{gradID}")]
public async Task<ActionResult> UnesiCvecaru([FromBody]Cvecara cvecara, int gradID)
{
    var grad = await Context.Gradovi.FindAsync(gradID);
    if(grad == null)
    {
        return BadRequest("Grad ne postoji!");
    }
    if(cvecara.CvecaraId <0)
    {
        return BadRequest("Nije validan id cvecare.");
    }
    if(string.IsNullOrWhiteSpace(cvecara.NazivCvecare))
    {
        return BadRequest("Nije validan naziv cvecare.");
    }

    try{
        var cvecaraExists = await Context.Cvecare
                                    .Where(c => c.NazivCvecare == cvecara.NazivCvecare && c.Lokacija == cvecara.Lokacija && c.ImePrezimeVlasnika == cvecara.ImePrezimeVlasnika)
                                    .FirstOrDefaultAsync();
        if(cvecaraExists != null) // ako vec postoji, vratiti BadRequest
        {
            return BadRequest($"Cvecara sa nazivom {cvecara.NazivCvecare} i lokacijom {cvecara.Lokacija} i vlasnikom {cvecara.ImePrezimeVlasnika} već postoji.");
        }

        var cvecaraa = new Cvecara
        {
            NazivCvecare = cvecara.NazivCvecare,
            Lokacija = cvecara.Lokacija,
            ImePrezimeVlasnika = cvecara.ImePrezimeVlasnika
        };

        var spoj = new GradCvecara
        {
            Cvecara = cvecaraa,
            Grad = grad
        };
        
        await Context.Cvecare.AddAsync(cvecaraa);
        await Context.GradCvecare.AddAsync(spoj);
        await Context.SaveChangesAsync();

        return Ok($"Dodali ste cvecaru sa id-jem {cvecaraa.CvecaraId} u grad sa id-jem {grad.IDGrada}");

    }
    catch(Exception e)
    {
        return BadRequest(e.Message);
    }
}

    //[Authorize(Role.Admin)]
    // [HttpPost("UnesiCvecaru/{gradID}")]

    // public async Task<ActionResult> UnesiCvecaru([FromBody]Cvecara cvecara, int gradID)
    // {

    //     var grad = await Context.Gradovi.FindAsync(gradID);

    //     if(grad == null)
    //     {
    //         return BadRequest("Grad ne postoji!");
    //     }
    //     if(cvecara.CvecaraId <0)
    //     {
    //         return BadRequest("Nije validan id cvecare.");
    //     }
    //     if(string.IsNullOrWhiteSpace(cvecara.NazivCvecare))
    //     {
    //         return BadRequest("Nije validan naziv cvecare.");
    //     }
     

    //     try{
    //         var cvecaraa = new Cvecara
    //         {
    //             NazivCvecare = cvecara.NazivCvecare,
    //             Lokacija = cvecara.Lokacija,
    //             ImePrezimeVlasnika = cvecara.ImePrezimeVlasnika
    //         };
            
            
    //         var spoj = new GradCvecara
    //         {
    //             Cvecara = cvecara,
    //             Grad = grad
    //         };
            
    //         await Context.Cvecare.AddAsync(cvecaraa);
    //         await Context.GradCvecare.AddAsync(spoj);
    //         await Context.SaveChangesAsync();

    //         return Ok($"Dodali ste cvecaru sa id-jem {cvecaraa.CvecaraId} u grad sa id-jem {grad.IDGrada}");

    //     }
    //     catch(Exception e)
    //     {
    //         return BadRequest(e.Message);
    //     }
    // }

    //[Authorize(Role.Admin)]
    [Route("IzmeniCvecaru/{CvecaraID}/{NazivCvecare}/{Lokacija}/{ImePrezimeVlasnika}")]
    [HttpPut]

    public async Task<ActionResult> IzmeniCvecaru(int CvecaraID,string NazivCvecare,string Lokacija,string ImePrezimeVlasnika)
    {
        if(string.IsNullOrWhiteSpace(NazivCvecare))
        {
            return BadRequest("Unet je los naziv za cvecaru.");
        }
        try{
            var cvecara=await Context.Cvecare.FindAsync(CvecaraID);
            //var sorte=await Context.Sorte.Where       
            if(cvecara!=null)
            {
                cvecara.NazivCvecare=NazivCvecare;
                cvecara.Lokacija=Lokacija;
                cvecara.ImePrezimeVlasnika=ImePrezimeVlasnika;
            }
            Context.Cvecare.Update(cvecara!);
            await Context.SaveChangesAsync();
            return Ok("Cvecara je izmenjena: "+cvecara);
            
        }
        catch(Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    //[Authorize(Role.User)]
    [Route("VratiPresekCvecaraPoGraduIBiljci/{NazivGrada}/{NazivBiljke}")]
    [HttpGet]
    public async Task<ActionResult> VratiPresekCvecaraPoGraduIBiljci(string NazivGrada, string NazivBiljke)
    {
       try {
       var cvecarePoGradu = await Context.GradCvecare
            .Where(gc => gc.Grad!.NazivGrada == NazivGrada)
            .Select(gc => gc.Cvecara)
            .ToListAsync();

        var cvecarePoBiljci = await Context.Cvecare
            .Where(c => c.Biljkee!.Any(b => b.Naziv == NazivBiljke))
            .ToListAsync();

        var presekCvecara = cvecarePoGradu.Intersect(cvecarePoBiljci).ToList();

        return Ok(presekCvecara);
       }
       catch(Exception e)
       {
        return BadRequest(e.Message);
       }
    }

}
}    

