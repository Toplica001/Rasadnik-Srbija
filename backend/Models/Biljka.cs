namespace Models;
[Table("Biljka")]

public class Biljka{
    [Key]
    [Column("BiljkaID")]

    public int BiljkaId{get;set;}

    [Column("NazivBiljke")]

    public string? Naziv{get;set;}

    [Column("SlikaBiljke")]
    public string? SlikaBiljke { get; set; }

    [Column("CenaBiljke")]
    public int Cena { get; set; }

    [Column("KolicinaNaStanju")]
    public int KolicinaNaStanju { get; set; }

    [Column("Deklaracija")]
    public string? Deklaracija { get; set; }

    [Column("VrstaBiljke")]
    public Sorte? Sorta { get; set; }

    [Column("Korpa")]
    public List<Korpa>? Korpa { get; set; }
    public Cvecara? Cvecara { get; set; }

}