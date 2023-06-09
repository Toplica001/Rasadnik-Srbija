namespace Models;

public class FloraContext : DbContext
{

    public required DbSet<Biljka> Biljke {get;set;}
    public required DbSet<Cvecara> Cvecare  {get;set;}
    public required DbSet<Korisnik> Korisnici  {get;set;}
    public required DbSet<Korpa> Korpe  {get;set;}
    public required DbSet<OcenaFirme> OceneFirme {get;set;}
    public required DbSet<Porudzbina> Porudzbine  {get;set;}
    public required DbSet<Sorte> Sorte  {get;set;}
    public required DbSet<Grad> Gradovi  {get;set;}
    public required DbSet<GradCvecara> GradCvecare  {get;set;}

  

    public FloraContext(DbContextOptions options) : base(options)
    {
        
    }
}
