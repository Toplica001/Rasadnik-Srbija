namespace Models{
   [Table("Sorte")]

   public class Sorte{
      [Key]
      [Column("SorteID")]

      public int SorteId{get;set;}

      [Column("NazivSorte")]

      public string? NazivSorte{get;set;}

      public List<Biljka>? Biljka { get; set; }

      public Cvecara? Cvecara { get; set; }

   }

}