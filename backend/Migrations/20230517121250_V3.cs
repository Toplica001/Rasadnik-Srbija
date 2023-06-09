using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebTemplate.Migrations
{
    /// <inheritdoc />
    public partial class V3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Biljka_Korpa_KorpaId",
                table: "Biljka");

            migrationBuilder.DropIndex(
                name: "IX_Biljka_KorpaId",
                table: "Biljka");

            migrationBuilder.DropColumn(
                name: "KorpaId",
                table: "Biljka");

            migrationBuilder.AddColumn<int>(
                name: "BiljkaId",
                table: "Korpa",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Korpa_BiljkaId",
                table: "Korpa",
                column: "BiljkaId");

            migrationBuilder.AddForeignKey(
                name: "FK_Korpa_Biljka_BiljkaId",
                table: "Korpa",
                column: "BiljkaId",
                principalTable: "Biljka",
                principalColumn: "BiljkaID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Korpa_Biljka_BiljkaId",
                table: "Korpa");

            migrationBuilder.DropIndex(
                name: "IX_Korpa_BiljkaId",
                table: "Korpa");

            migrationBuilder.DropColumn(
                name: "BiljkaId",
                table: "Korpa");

            migrationBuilder.AddColumn<int>(
                name: "KorpaId",
                table: "Biljka",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Biljka_KorpaId",
                table: "Biljka",
                column: "KorpaId");

            migrationBuilder.AddForeignKey(
                name: "FK_Biljka_Korpa_KorpaId",
                table: "Biljka",
                column: "KorpaId",
                principalTable: "Korpa",
                principalColumn: "KorpaID");
        }
    }
}
