using System.Text.Json.Serialization;

namespace Models{
    [Table("Korpa")]

    public class Korpa{
        [Key]
        [Column("KorpaID")]

        public int KorpaId{get;set;}

        [Column("KolicinaProizvoda")]
        public int KolicinaProizvoda { get; set; }

        [Column("Korisnik")]
        public Korisnik? Korisnik { get; set; }

        [JsonIgnore]
        public Biljka? Biljka { get; set; }

    }
}
