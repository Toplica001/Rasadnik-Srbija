namespace Models{
  [Table("Porudzbina")]

  public class Porudzbina{
    [Key]
    [Column("PorudzbinaID")]

    public int PorudzbinaId{get;set;}

    [Column("AdresaKupca")]
    public string? AdresaKupca { get; set; }

    [Column("Kolicina")]
    public int BrojBiljaka { get; set; }

    [Column("UkupnaCena")]
    public int UkupnaCena { get; set; }
    
    public Korisnik? Korisnik { get; set; }

    public List<Korpa>? Korpa { get; set; }
   
  
  }  
}