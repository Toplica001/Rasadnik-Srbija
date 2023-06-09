using Microsoft.AspNetCore.Mvc;
using System.IO;
using System.Threading.Tasks;


   
    [ApiController]
[Route("[controller]")]
    public class SlikaController : ControllerBase
    {
        public FloraContext Context { get; set; }

    public SlikaController(FloraContext context)
    {
        Context = context;
    }

        
       
    [HttpGet("VratiSliku/{id}")]
        public async Task<IActionResult> VratiSliku(int id)
        {
            var biljka = await Context.Biljke.FindAsync(id);
            if (biljka == null)
            {
                return NotFound();
            }

            if (String.IsNullOrEmpty(biljka.SlikaBiljke))
            {
                return NotFound("Slika nije pronađena.");
            }

            // Konvertuj string slike u bajt niz
         // dobijemo putanju do datoteke koja sadrzi sliku

string filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwRoot", "Slike", biljka.SlikaBiljke);

// provjeravamo da li datoteka postoji
if (!System.IO.File.Exists(filePath))
{
    return NotFound("Slika nije pronađena."+filePath);
}

// čitamo bajtove iz datoteke
byte[] slikaBytes = System.IO.File.ReadAllBytes(filePath);

// vraćamo sliku
return File(slikaBytes, "image/jpeg");
        }
    }