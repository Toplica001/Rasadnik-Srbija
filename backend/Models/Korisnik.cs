namespace Models{
  [Table("Korisnik")]

  public class Korisnik{
      [Key]
      [Column("KorisnikID")]

      public int KorisnikId{get;set;}

      [Column("ImeKorisnika")]

      public string? ImeKorisnika{get;set;}

      [Column("PrezimeKorisnika")]

      public string? PrezimeKorisnika{get;set;}
      
      [RegularExpression(@"^[^@]+@[^@]+\.[^@]+$")]
      [Column("EmailKorisnika")]
      public string? EmailKorisnika { get; set; }

      [MinLength(8)]
      [Column("SifraKorisnika")]
      public string? SifraKorisnika { get; set; }

      [Column("KorisnickoIme")]
      public string? KorisnickoIme { get; set; }

      [Column("TipKorisnika")]
      public Role TipKorisnika { get; set; }

      [Column("AdresaKorisnika")]
      public string? AdresaKorisnika { get; set; }

      public List<OcenaFirme>? OcenaFirme { get; set; }
      
    
    }
 }