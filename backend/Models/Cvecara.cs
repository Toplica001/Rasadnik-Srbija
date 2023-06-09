using System.Text.Json.Serialization;

namespace Models{
    [Table("Cvecara")]

    public class Cvecara{
        [Key]
        [Column("CvecaraID")]

        public int CvecaraId{get;set;}

        [Column("NazivCvecare")]

        public string? NazivCvecare{get;set;}

        [Column("LokacijaCvecare")]
        public string? Lokacija { get; set; }

        [Column("ImeIPrezimeVlasnika")]
        public string? ImePrezimeVlasnika { get; set; }
        [JsonIgnore]
        public List<Sorte>? Sorta { get; set; }
        [JsonIgnore]
        public List<Biljka>? Biljkee { get; set; }
            
        public List<OcenaFirme>? OcenaFirme { get; set; }
        [JsonIgnore]
        public List<GradCvecara>? GradCvecara { get; set; }
    
    }
}