

namespace Models
{
    [Table("Grad")]
    
    public class Grad
    {
        [Key]
        [Column("GradID")]
        public int IDGrada { get; set; }

        [Column("NazivGrada")]
        public string? NazivGrada { get; set; }
        [JsonIgnore]
        public List<GradCvecara>? GradCvecara { get; set; }
    }
}