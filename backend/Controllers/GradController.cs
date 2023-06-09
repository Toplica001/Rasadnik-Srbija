namespace FloraProjekat.Controllers{
//[Authorize]
[ApiController]
[Route("[controller]")]
public class GradController : ControllerBase
{
    public FloraContext Context { get; set; }

    public GradController(FloraContext context)
    {
        Context = context;
    }

    //[Authorize(Role.User)]
    [Route("VratiSveGradove")]
    [HttpGet]

    public async Task<ActionResult> VratiSveGradove()
    {
        try{
            var gradovi=await Context.Gradovi.ToListAsync();
          //  return Ok("Sledeci gradovi postoje u aplikaciji:"+gradovi);
          return Ok(gradovi);
        }
        catch(Exception e)
        {
            return BadRequest("Trenutno nema nijedan grad u aplikaciji."+ e.Message);
        }
    }

    //[Authorize(Role.Admin)]
    [Route("IzbrisiGrad/{GradID}")]
    [HttpDelete]

    public async Task<ActionResult> IzbrisiGrad(int GradID)
    {
        if(GradID<=0)
        {
            return BadRequest("Los id grada.");
        }
        try{
            var grad=await Context.Gradovi.FindAsync(GradID);
            if(grad==null)
            {
                return BadRequest("Grad nije nadjen.");
            }
            Context.Gradovi.Remove(grad);
            await Context.SaveChangesAsync();
            return Ok("Obrisan je grad sa ID-jem: "+GradID+".");
        }
        catch(Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    //[Authorize(Role.Admin)]
    [Route("UnesiGrad")]
    [HttpPost]

    public async Task<ActionResult> UnesiGrad([FromBody]Grad grad)
    {
        if(grad.IDGrada <0)
        {
            return BadRequest("Nije validan id grada.");
        }
        if(string.IsNullOrWhiteSpace(grad.NazivGrada) || grad.NazivGrada.Length > 20)
        {
            return BadRequest("Nije validan naziv grada.");
        }
     

        try{
            await Context.Gradovi.AddAsync(grad);
            await Context.SaveChangesAsync();
            return Ok("Unet je grad sa ID-jem: "+grad.IDGrada+" i nazivom: "+grad.NazivGrada+".");
        }
        catch(Exception e)
        {
            return BadRequest(e.Message);
        }
    }

   // [Authorize(Role.Admin)]
    [Route("IzmeniGrad/{GradID}/{NazivGrada}")]
    [HttpPut]
  //za vezu???
    public async Task<ActionResult> IzmeniGrad(int GradID,string NazivGrada)
    {
        if(GradID <0)
        {
            return BadRequest("Nije validan id grada.");
        }
        if(string.IsNullOrWhiteSpace(NazivGrada) || NazivGrada.Length > 20)
        {
            return BadRequest("Unet je los naziv za grad.");
        }
        try{
            var grad=await Context.Gradovi.FindAsync(GradID);
            //var sorte=await Context.Sorte.Where      
            if(grad==null)
            {
                return BadRequest("Grad nije nadjen.");
            }
            grad.NazivGrada=NazivGrada;
            await Context.SaveChangesAsync();
            return Ok("Grad je izmenjen: "+grad);
            
        }
        catch(Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    }
}