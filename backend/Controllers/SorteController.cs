namespace FloraProjekat.Controllers{
//[Authorize]
[ApiController]
[Route("[controller]")]
public class SorteController : ControllerBase
{
    public FloraContext Context { get; set; }

    public SorteController(FloraContext context)
    {
        Context = context;
    }

    
   // [Authorize]
    [Route("VratiSveSorte")]
    [HttpGet]

    public async Task<ActionResult> VratiSveSorte()
    {
        try{
           // var sorte = await Context.Sorte.ToListAsync();
           // return Ok("Sledece sorte postoje u aplikaciji:"+sorte);
           return Ok(await Context.Sorte.Include(p => p.Cvecara).ToListAsync());
        }
        catch(Exception e)
        {
            return BadRequest("Trenutno nema nijedna sorta u aplikaciji."+ e.Message);
        }
    }

   // [Authorize(Role.Admin)]
    [Route("IzbrisiSortu/{SortaID}")]
    [HttpDelete]

    public async Task<ActionResult> IzbrisiSortu(int SortaID)
    {
        if(SortaID<=0)
        {
            return BadRequest("Los id sorte.");
        }
        try{
            var sorta=await Context.Sorte.FindAsync(SortaID);
            if(sorta==null)
            {
                return BadRequest("Ne postoji takva sorta.");
            }
            Context.Sorte.Remove(sorta);
            await Context.SaveChangesAsync();
            return Ok("Obrisana je sorta sa ID-jem: "+SortaID+".");
        }
        catch(Exception e)
        {
            return BadRequest(e.Message);
        }
    }

   // [Authorize(Role.Admin)]
   [Route("UnesiSortu/{cvecaraID}")]
[HttpPost]
public async Task<ActionResult> UnesiSortu([FromBody]Sorte sorta, int cvecaraID)
{
    var cvecara = await Context.Cvecare.FindAsync(cvecaraID);
    if (cvecara == null)
    {
        return BadRequest("Cvecara ne postoji!");
    }

    if (sorta.SorteId < 0)
    {
        return BadRequest("Nije validan id sorte.");
    }
    if (string.IsNullOrWhiteSpace(sorta.NazivSorte) || sorta.NazivSorte.Length > 20)
    {
        return BadRequest("Nije validan naziv sorte.");
    }

    try
    {
        var sorte = new Sorte
        {
            NazivSorte = sorta.NazivSorte,
            Cvecara = cvecara
        };

        await Context.Sorte.AddAsync(sorte);
        await Context.SaveChangesAsync();
        return Ok("Uneli ste sortu u cvecaru!" + cvecara.NazivCvecare);
    }
    catch (Exception e)
    {
        return BadRequest(e.Message);
    }
}
    // [Route("UnesiSortu/{cvecaraID}")]
    // [HttpPost]

    // public async Task<ActionResult> UnesiSortu([FromBody]Sorte sorta, int cvecaraID)
    // {
    //     var cvecara = await Context.Cvecare.FindAsync(cvecaraID);
    //     if(cvecara == null)
    //     {
    //         return BadRequest("Cvecara ne postoji!");
    //     }

    //     if(sorta.SorteId <0)
    //     {
    //         return BadRequest("Nije validan id sorte.");
    //     }
    //     if(string.IsNullOrWhiteSpace(sorta.NazivSorte)|| sorta.NazivSorte.Length > 20)
    //     {
    //         return BadRequest("Nije validan naziv sorte.");
    //     }
     

    //     try{
    //         var sorte = new Sorte
    //         {
    //             NazivSorte = sorta.NazivSorte,
    //             Cvecara = cvecara
    //         };
            
    //         if(sorte.Cvecara.Sorta==null)
    //         {
    //             sorte.Cvecara.Sorta=new List<Sorte>();
    //         }
          
    //         sorte.Cvecara.Sorta.Add(sorte);
    //         //sorte.Cvecara.Sorta.Add(sorte);
    //         await Context.Sorte.AddAsync(sorte);
    //         await Context.SaveChangesAsync();
    //         return Ok("Uneli ste sortu u cvecaru!"+cvecara.NazivCvecare);
    //     }
    //     catch(Exception e)
    //     {
    //         return BadRequest(e.Message);
    //     }
    // }

   // [Authorize(Role.Admin)]
    [Route("IzmeniSortu/{SortaID}/{NazivSorte}")]
    [HttpPut]
    public async Task<ActionResult> IzmeniSortu(int SortaID,string NazivSorte)
    {
        if(string.IsNullOrWhiteSpace(NazivSorte) || NazivSorte.Length > 20)
        {
            return BadRequest("Unet je los naziv za sortu.");
        }
        try{
            var sorta=await Context.Sorte.FindAsync(SortaID);      
            if(sorta==null)
            {
                return BadRequest("Ne postoji takva sorta!");            
            }
            sorta.NazivSorte=NazivSorte; 

            Context.Sorte.Update(sorta);
            await Context.SaveChangesAsync();
            return Ok("Sorta je izmenjena: "+sorta);
            
        }
        catch(Exception e)
        {
            return BadRequest(e.Message);
        }
    }
}
}