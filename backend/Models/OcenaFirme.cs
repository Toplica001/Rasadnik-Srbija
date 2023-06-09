namespace Models{
  [Table("OcenaFirme")]

  public class OcenaFirme{
    [Key]
    [Column("OcenaFirmeID")]

    public int OcenaFirmeId{get;set;}

    [Column("Ocena")]
    [Range(1,5)]
    public int Ocena { get; set; }

    [Column("Cvecara")]
    public Cvecara? Cvecara { get; set; }
    
    [Column("KrajnjiKorisnik")]
    public Korisnik? Korisnik { get; set; }
  }

}