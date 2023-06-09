using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebTemplate.Migrations
{
    /// <inheritdoc />
    public partial class V4 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Porudzbina_Korpa_KorpaId",
                table: "Porudzbina");

            migrationBuilder.DropIndex(
                name: "IX_Porudzbina_KorpaId",
                table: "Porudzbina");

            migrationBuilder.DropColumn(
                name: "KorpaId",
                table: "Porudzbina");

            migrationBuilder.AddColumn<int>(
                name: "UkupnaCena",
                table: "Porudzbina",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "PorudzbinaId",
                table: "Korpa",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Korpa_PorudzbinaId",
                table: "Korpa",
                column: "PorudzbinaId");

            migrationBuilder.AddForeignKey(
                name: "FK_Korpa_Porudzbina_PorudzbinaId",
                table: "Korpa",
                column: "PorudzbinaId",
                principalTable: "Porudzbina",
                principalColumn: "PorudzbinaID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Korpa_Porudzbina_PorudzbinaId",
                table: "Korpa");

            migrationBuilder.DropIndex(
                name: "IX_Korpa_PorudzbinaId",
                table: "Korpa");

            migrationBuilder.DropColumn(
                name: "UkupnaCena",
                table: "Porudzbina");

            migrationBuilder.DropColumn(
                name: "PorudzbinaId",
                table: "Korpa");

            migrationBuilder.AddColumn<int>(
                name: "KorpaId",
                table: "Porudzbina",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Porudzbina_KorpaId",
                table: "Porudzbina",
                column: "KorpaId");

            migrationBuilder.AddForeignKey(
                name: "FK_Porudzbina_Korpa_KorpaId",
                table: "Porudzbina",
                column: "KorpaId",
                principalTable: "Korpa",
                principalColumn: "KorpaID");
        }
    }
}
