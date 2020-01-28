using Microsoft.EntityFrameworkCore.Migrations;

namespace jrascraping.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CnameTable",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Racename = table.Column<string>(nullable: true),
                    Cname = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CnameTable", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "RaceResults",
                columns: table => new
                {
                    Date = table.Column<string>(nullable: false),
                    Racename = table.Column<string>(nullable: false),
                    Place = table.Column<string>(nullable: false),
                    Waku = table.Column<int>(nullable: false),
                    Num = table.Column<int>(nullable: false),
                    Horse = table.Column<string>(nullable: true),
                    Age = table.Column<string>(nullable: true),
                    Weight = table.Column<string>(nullable: true),
                    Jockey = table.Column<string>(nullable: true),
                    Margin = table.Column<string>(nullable: true),
                    Time = table.Column<string>(nullable: true),
                    Corner = table.Column<string>(nullable: true),
                    F_time = table.Column<string>(nullable: true),
                    H_weight = table.Column<string>(nullable: true),
                    Trainer = table.Column<string>(nullable: true),
                    Pop = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RaceResults", x => new { x.Date, x.Racename, x.Place, x.Waku });
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CnameTable");

            migrationBuilder.DropTable(
                name: "RaceResults");
        }
    }
}
