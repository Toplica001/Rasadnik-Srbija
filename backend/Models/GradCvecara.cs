namespace Models{
    [Table("GradCvecara")]

    public class GradCvecara{
        [Key]
        [Column("GradCvecaraID")]
        public int GradCvecaraId { get; set; }
        public Grad? Grad { get; set; }
        public Cvecara? Cvecara { get; set; }
    }
}