using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebTemplate.Migrations
{
    /// <inheritdoc />
    public partial class V1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Cvecara",
                columns: table => new
                {
                    CvecaraID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NazivCvecare = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LokacijaCvecare = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ImeIPrezimeVlasnika = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cvecara", x => x.CvecaraID);
                });

            migrationBuilder.CreateTable(
                name: "Grad",
                columns: table => new
                {
                    GradID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NazivGrada = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Grad", x => x.GradID);
                });

            migrationBuilder.CreateTable(
                name: "Korisnik",
                columns: table => new
                {
                    KorisnikID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ImeKorisnika = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PrezimeKorisnika = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EmailKorisnika = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SifraKorisnika = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    KorisnickoIme = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TipKorisnika = table.Column<int>(type: "int", nullable: false),
                    AdresaKorisnika = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Korisnik", x => x.KorisnikID);
                });

            migrationBuilder.CreateTable(
                name: "Sorte",
                columns: table => new
                {
                    SorteID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NazivSorte = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CvecaraId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sorte", x => x.SorteID);
                    table.ForeignKey(
                        name: "FK_Sorte_Cvecara_CvecaraId",
                        column: x => x.CvecaraId,
                        principalTable: "Cvecara",
                        principalColumn: "CvecaraID");
                });

            migrationBuilder.CreateTable(
                name: "GradCvecara",
                columns: table => new
                {
                    GradCvecaraID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    GradIDGrada = table.Column<int>(type: "int", nullable: true),
                    CvecaraId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GradCvecara", x => x.GradCvecaraID);
                    table.ForeignKey(
                        name: "FK_GradCvecara_Cvecara_CvecaraId",
                        column: x => x.CvecaraId,
                        principalTable: "Cvecara",
                        principalColumn: "CvecaraID");
                    table.ForeignKey(
                        name: "FK_GradCvecara_Grad_GradIDGrada",
                        column: x => x.GradIDGrada,
                        principalTable: "Grad",
                        principalColumn: "GradID");
                });

            migrationBuilder.CreateTable(
                name: "Korpa",
                columns: table => new
                {
                    KorpaID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    KolicinaProizvoda = table.Column<int>(type: "int", nullable: false),
                    KorisnikId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Korpa", x => x.KorpaID);
                    table.ForeignKey(
                        name: "FK_Korpa_Korisnik_KorisnikId",
                        column: x => x.KorisnikId,
                        principalTable: "Korisnik",
                        principalColumn: "KorisnikID");
                });

            migrationBuilder.CreateTable(
                name: "OcenaFirme",
                columns: table => new
                {
                    OcenaFirmeID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Ocena = table.Column<int>(type: "int", nullable: false),
                    CvecaraId = table.Column<int>(type: "int", nullable: true),
                    KorisnikId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OcenaFirme", x => x.OcenaFirmeID);
                    table.ForeignKey(
                        name: "FK_OcenaFirme_Cvecara_CvecaraId",
                        column: x => x.CvecaraId,
                        principalTable: "Cvecara",
                        principalColumn: "CvecaraID");
                    table.ForeignKey(
                        name: "FK_OcenaFirme_Korisnik_KorisnikId",
                        column: x => x.KorisnikId,
                        principalTable: "Korisnik",
                        principalColumn: "KorisnikID");
                });

            migrationBuilder.CreateTable(
                name: "Biljka",
                columns: table => new
                {
                    BiljkaID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NazivBiljke = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SlikaBiljke = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CenaBiljke = table.Column<int>(type: "int", nullable: false),
                    KolicinaNaStanju = table.Column<int>(type: "int", nullable: false),
                    Deklaracija = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SortaSorteId = table.Column<int>(type: "int", nullable: true),
                    KorpaId = table.Column<int>(type: "int", nullable: true),
                    CvecaraId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Biljka", x => x.BiljkaID);
                    table.ForeignKey(
                        name: "FK_Biljka_Cvecara_CvecaraId",
                        column: x => x.CvecaraId,
                        principalTable: "Cvecara",
                        principalColumn: "CvecaraID");
                    table.ForeignKey(
                        name: "FK_Biljka_Korpa_KorpaId",
                        column: x => x.KorpaId,
                        principalTable: "Korpa",
                        principalColumn: "KorpaID");
                    table.ForeignKey(
                        name: "FK_Biljka_Sorte_SortaSorteId",
                        column: x => x.SortaSorteId,
                        principalTable: "Sorte",
                        principalColumn: "SorteID");
                });

            migrationBuilder.CreateTable(
                name: "Porudzbina",
                columns: table => new
                {
                    PorudzbinaID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AdresaKupca = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Kolicina = table.Column<int>(type: "int", nullable: false),
                    KorisnikId = table.Column<int>(type: "int", nullable: true),
                    KorpaId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Porudzbina", x => x.PorudzbinaID);
                    table.ForeignKey(
                        name: "FK_Porudzbina_Korisnik_KorisnikId",
                        column: x => x.KorisnikId,
                        principalTable: "Korisnik",
                        principalColumn: "KorisnikID");
                    table.ForeignKey(
                        name: "FK_Porudzbina_Korpa_KorpaId",
                        column: x => x.KorpaId,
                        principalTable: "Korpa",
                        principalColumn: "KorpaID");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Biljka_CvecaraId",
                table: "Biljka",
                column: "CvecaraId");

            migrationBuilder.CreateIndex(
                name: "IX_Biljka_KorpaId",
                table: "Biljka",
                column: "KorpaId");

            migrationBuilder.CreateIndex(
                name: "IX_Biljka_SortaSorteId",
                table: "Biljka",
                column: "SortaSorteId");

            migrationBuilder.CreateIndex(
                name: "IX_GradCvecara_CvecaraId",
                table: "GradCvecara",
                column: "CvecaraId");

            migrationBuilder.CreateIndex(
                name: "IX_GradCvecara_GradIDGrada",
                table: "GradCvecara",
                column: "GradIDGrada");

            migrationBuilder.CreateIndex(
                name: "IX_Korpa_KorisnikId",
                table: "Korpa",
                column: "KorisnikId");

            migrationBuilder.CreateIndex(
                name: "IX_OcenaFirme_CvecaraId",
                table: "OcenaFirme",
                column: "CvecaraId");

            migrationBuilder.CreateIndex(
                name: "IX_OcenaFirme_KorisnikId",
                table: "OcenaFirme",
                column: "KorisnikId");

            migrationBuilder.CreateIndex(
                name: "IX_Porudzbina_KorisnikId",
                table: "Porudzbina",
                column: "KorisnikId");

            migrationBuilder.CreateIndex(
                name: "IX_Porudzbina_KorpaId",
                table: "Porudzbina",
                column: "KorpaId");

            migrationBuilder.CreateIndex(
                name: "IX_Sorte_CvecaraId",
                table: "Sorte",
                column: "CvecaraId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Biljka");

            migrationBuilder.DropTable(
                name: "GradCvecara");

            migrationBuilder.DropTable(
                name: "OcenaFirme");

            migrationBuilder.DropTable(
                name: "Porudzbina");

            migrationBuilder.DropTable(
                name: "Sorte");

            migrationBuilder.DropTable(
                name: "Grad");

            migrationBuilder.DropTable(
                name: "Korpa");

            migrationBuilder.DropTable(
                name: "Cvecara");

            migrationBuilder.DropTable(
                name: "Korisnik");
        }
    }
}
