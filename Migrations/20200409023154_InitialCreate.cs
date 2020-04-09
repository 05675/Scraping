using System;
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
                name: "HorseInfo",
                columns: table => new
                {
                    HorseName = table.Column<string>(nullable: false),
                    Birthday = table.Column<DateTime>(nullable: false),
                    Father = table.Column<string>(nullable: true),
                    Mother = table.Column<string>(nullable: true),
                    MotherFather = table.Column<string>(nullable: true),
                    MotherMother = table.Column<string>(nullable: true),
                    Sex = table.Column<string>(nullable: true),
                    CoatColor = table.Column<string>(nullable: true),
                    HorseNameMeaning = table.Column<string>(nullable: true),
                    HorseOwner = table.Column<string>(nullable: true),
                    Trainer = table.Column<string>(nullable: true),
                    ProductionRanch = table.Column<string>(nullable: true),
                    Origin = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HorseInfo", x => new { x.HorseName, x.Birthday });
                });

            migrationBuilder.CreateTable(
                name: "PayBack",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    TanshoHorseName = table.Column<string>(nullable: true),
                    TanshoBirthday = table.Column<DateTime>(nullable: true),
                    TanshoNum = table.Column<int>(nullable: false),
                    TanshoRe = table.Column<int>(nullable: false),
                    Fuku1HorseName = table.Column<string>(nullable: true),
                    Fuku1Birthday = table.Column<DateTime>(nullable: true),
                    Fuku1Num = table.Column<int>(nullable: false),
                    Fuku1Re = table.Column<int>(nullable: false),
                    Fuku2HorseName = table.Column<string>(nullable: true),
                    Fuku2Birthday = table.Column<DateTime>(nullable: true),
                    Fuku2Num = table.Column<int>(nullable: false),
                    Fuku2Re = table.Column<int>(nullable: false),
                    Fuku3HorseName = table.Column<string>(nullable: true),
                    Fuku3Birthday = table.Column<DateTime>(nullable: true),
                    Fuku3Num = table.Column<int>(nullable: false),
                    Fuku3Re = table.Column<int>(nullable: false),
                    Wakuren1HorseName = table.Column<string>(nullable: true),
                    Wakuren1Birthday = table.Column<DateTime>(nullable: true),
                    Wakuren1Waku = table.Column<int>(nullable: false),
                    Wakuren2HorseName = table.Column<string>(nullable: true),
                    Wakuren2Birthday = table.Column<DateTime>(nullable: true),
                    Wakuren2Waku = table.Column<int>(nullable: false),
                    WakurenRe = table.Column<int>(nullable: false),
                    Wide1_1HorseName = table.Column<string>(nullable: true),
                    Wide1_1Birthday = table.Column<DateTime>(nullable: true),
                    Wide1_2HorseName = table.Column<string>(nullable: true),
                    Wide1_2Birthday = table.Column<DateTime>(nullable: true),
                    Wide1_1Num = table.Column<int>(nullable: false),
                    Wide1_2Num = table.Column<int>(nullable: false),
                    Wide1Re = table.Column<int>(nullable: false),
                    Wide2_1HorseName = table.Column<string>(nullable: true),
                    Wide2_1Birthday = table.Column<DateTime>(nullable: true),
                    Wide2_2HorseName = table.Column<string>(nullable: true),
                    Wide2_2Birthday = table.Column<DateTime>(nullable: true),
                    Wide2_1Num = table.Column<int>(nullable: false),
                    Wide2_2Num = table.Column<int>(nullable: false),
                    Wide2Re = table.Column<int>(nullable: false),
                    Wide3_1HorseName = table.Column<string>(nullable: true),
                    Wide3_1Birthday = table.Column<DateTime>(nullable: true),
                    Wide3_2HorseName = table.Column<string>(nullable: true),
                    Wide3_2Birthday = table.Column<DateTime>(nullable: true),
                    Wide3_1Num = table.Column<int>(nullable: false),
                    Wide3_2Num = table.Column<int>(nullable: false),
                    Wide3Re = table.Column<int>(nullable: false),
                    Umaren1HorseName = table.Column<string>(nullable: true),
                    Umaren1Birthday = table.Column<DateTime>(nullable: true),
                    Umaren2HorseName = table.Column<string>(nullable: true),
                    Umaren2Birthday = table.Column<DateTime>(nullable: true),
                    Umaren1Num = table.Column<int>(nullable: false),
                    Umaren2Num = table.Column<int>(nullable: false),
                    UmarenRe = table.Column<int>(nullable: false),
                    Umatan1HorseName = table.Column<string>(nullable: true),
                    Umatan1Birthday = table.Column<DateTime>(nullable: true),
                    Umatan2HorseName = table.Column<string>(nullable: true),
                    Umatan2Birthday = table.Column<DateTime>(nullable: true),
                    Umatan1Num = table.Column<int>(nullable: false),
                    Umatan2Num = table.Column<int>(nullable: false),
                    UmatanRe = table.Column<int>(nullable: false),
                    Sanfuku1HorseName = table.Column<string>(nullable: true),
                    Sanfuku1Birthday = table.Column<DateTime>(nullable: true),
                    Sanfuku2HorseName = table.Column<string>(nullable: true),
                    Sanfuku2Birthday = table.Column<DateTime>(nullable: true),
                    Sanfuku3HorseName = table.Column<string>(nullable: true),
                    Sanfuku3Birthday = table.Column<DateTime>(nullable: true),
                    Sanfuku1Num = table.Column<int>(nullable: false),
                    Sanfuku2Num = table.Column<int>(nullable: false),
                    Sanfuku3Num = table.Column<int>(nullable: false),
                    SanfukuRe = table.Column<int>(nullable: false),
                    Santan1HorseName = table.Column<string>(nullable: true),
                    Santan1Birthday = table.Column<DateTime>(nullable: true),
                    Santan2HorseName = table.Column<string>(nullable: true),
                    Santan2Birthday = table.Column<DateTime>(nullable: true),
                    Santan3HorseName = table.Column<string>(nullable: true),
                    Santan3Birthday = table.Column<DateTime>(nullable: true),
                    Santan1Num = table.Column<int>(nullable: false),
                    Santan2Num = table.Column<int>(nullable: false),
                    Santan3Num = table.Column<int>(nullable: false),
                    SantanRe = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PayBack", x => x.ID);
                    table.ForeignKey(
                        name: "FK_PayBack_HorseInfo_Fuku1HorseName_Fuku1Birthday",
                        columns: x => new { x.Fuku1HorseName, x.Fuku1Birthday },
                        principalTable: "HorseInfo",
                        principalColumns: new[] { "HorseName", "Birthday" },
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_PayBack_HorseInfo_Fuku2HorseName_Fuku2Birthday",
                        columns: x => new { x.Fuku2HorseName, x.Fuku2Birthday },
                        principalTable: "HorseInfo",
                        principalColumns: new[] { "HorseName", "Birthday" },
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_PayBack_HorseInfo_Fuku3HorseName_Fuku3Birthday",
                        columns: x => new { x.Fuku3HorseName, x.Fuku3Birthday },
                        principalTable: "HorseInfo",
                        principalColumns: new[] { "HorseName", "Birthday" },
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_PayBack_HorseInfo_Sanfuku1HorseName_Sanfuku1Birthday",
                        columns: x => new { x.Sanfuku1HorseName, x.Sanfuku1Birthday },
                        principalTable: "HorseInfo",
                        principalColumns: new[] { "HorseName", "Birthday" },
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_PayBack_HorseInfo_Sanfuku2HorseName_Sanfuku2Birthday",
                        columns: x => new { x.Sanfuku2HorseName, x.Sanfuku2Birthday },
                        principalTable: "HorseInfo",
                        principalColumns: new[] { "HorseName", "Birthday" },
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_PayBack_HorseInfo_Sanfuku3HorseName_Sanfuku3Birthday",
                        columns: x => new { x.Sanfuku3HorseName, x.Sanfuku3Birthday },
                        principalTable: "HorseInfo",
                        principalColumns: new[] { "HorseName", "Birthday" },
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_PayBack_HorseInfo_Santan1HorseName_Santan1Birthday",
                        columns: x => new { x.Santan1HorseName, x.Santan1Birthday },
                        principalTable: "HorseInfo",
                        principalColumns: new[] { "HorseName", "Birthday" },
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_PayBack_HorseInfo_Santan2HorseName_Santan2Birthday",
                        columns: x => new { x.Santan2HorseName, x.Santan2Birthday },
                        principalTable: "HorseInfo",
                        principalColumns: new[] { "HorseName", "Birthday" },
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_PayBack_HorseInfo_Santan3HorseName_Santan3Birthday",
                        columns: x => new { x.Santan3HorseName, x.Santan3Birthday },
                        principalTable: "HorseInfo",
                        principalColumns: new[] { "HorseName", "Birthday" },
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_PayBack_HorseInfo_TanshoHorseName_TanshoBirthday",
                        columns: x => new { x.TanshoHorseName, x.TanshoBirthday },
                        principalTable: "HorseInfo",
                        principalColumns: new[] { "HorseName", "Birthday" },
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_PayBack_HorseInfo_Umaren1HorseName_Umaren1Birthday",
                        columns: x => new { x.Umaren1HorseName, x.Umaren1Birthday },
                        principalTable: "HorseInfo",
                        principalColumns: new[] { "HorseName", "Birthday" },
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_PayBack_HorseInfo_Umaren2HorseName_Umaren2Birthday",
                        columns: x => new { x.Umaren2HorseName, x.Umaren2Birthday },
                        principalTable: "HorseInfo",
                        principalColumns: new[] { "HorseName", "Birthday" },
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_PayBack_HorseInfo_Umatan1HorseName_Umatan1Birthday",
                        columns: x => new { x.Umatan1HorseName, x.Umatan1Birthday },
                        principalTable: "HorseInfo",
                        principalColumns: new[] { "HorseName", "Birthday" },
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_PayBack_HorseInfo_Umatan2HorseName_Umatan2Birthday",
                        columns: x => new { x.Umatan2HorseName, x.Umatan2Birthday },
                        principalTable: "HorseInfo",
                        principalColumns: new[] { "HorseName", "Birthday" },
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_PayBack_HorseInfo_Wakuren1HorseName_Wakuren1Birthday",
                        columns: x => new { x.Wakuren1HorseName, x.Wakuren1Birthday },
                        principalTable: "HorseInfo",
                        principalColumns: new[] { "HorseName", "Birthday" },
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_PayBack_HorseInfo_Wakuren2HorseName_Wakuren2Birthday",
                        columns: x => new { x.Wakuren2HorseName, x.Wakuren2Birthday },
                        principalTable: "HorseInfo",
                        principalColumns: new[] { "HorseName", "Birthday" },
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_PayBack_HorseInfo_Wide1_1HorseName_Wide1_1Birthday",
                        columns: x => new { x.Wide1_1HorseName, x.Wide1_1Birthday },
                        principalTable: "HorseInfo",
                        principalColumns: new[] { "HorseName", "Birthday" },
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_PayBack_HorseInfo_Wide1_2HorseName_Wide1_2Birthday",
                        columns: x => new { x.Wide1_2HorseName, x.Wide1_2Birthday },
                        principalTable: "HorseInfo",
                        principalColumns: new[] { "HorseName", "Birthday" },
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_PayBack_HorseInfo_Wide2_1HorseName_Wide2_1Birthday",
                        columns: x => new { x.Wide2_1HorseName, x.Wide2_1Birthday },
                        principalTable: "HorseInfo",
                        principalColumns: new[] { "HorseName", "Birthday" },
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_PayBack_HorseInfo_Wide2_2HorseName_Wide2_2Birthday",
                        columns: x => new { x.Wide2_2HorseName, x.Wide2_2Birthday },
                        principalTable: "HorseInfo",
                        principalColumns: new[] { "HorseName", "Birthday" },
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_PayBack_HorseInfo_Wide3_1HorseName_Wide3_1Birthday",
                        columns: x => new { x.Wide3_1HorseName, x.Wide3_1Birthday },
                        principalTable: "HorseInfo",
                        principalColumns: new[] { "HorseName", "Birthday" },
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_PayBack_HorseInfo_Wide3_2HorseName_Wide3_2Birthday",
                        columns: x => new { x.Wide3_2HorseName, x.Wide3_2Birthday },
                        principalTable: "HorseInfo",
                        principalColumns: new[] { "HorseName", "Birthday" },
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "RaceResults",
                columns: table => new
                {
                    Date = table.Column<string>(nullable: false),
                    Racename = table.Column<string>(nullable: false),
                    Place = table.Column<string>(nullable: false),
                    Waku = table.Column<int>(nullable: false),
                    NumberOfTime = table.Column<string>(nullable: true),
                    Num = table.Column<int>(nullable: false),
                    HorseName = table.Column<string>(nullable: true),
                    HorseBirthday = table.Column<DateTime>(nullable: true),
                    Weight = table.Column<string>(nullable: true),
                    Jockey = table.Column<string>(nullable: true),
                    Margin = table.Column<string>(nullable: true),
                    Time = table.Column<string>(nullable: true),
                    ArrivalDifference = table.Column<string>(nullable: true),
                    Corner = table.Column<string>(nullable: true),
                    HalongTime = table.Column<string>(nullable: true),
                    HorseWeight = table.Column<string>(nullable: true),
                    Trainer = table.Column<string>(nullable: true),
                    Pop = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RaceResults", x => new { x.Date, x.Racename, x.Place, x.Waku });
                    table.ForeignKey(
                        name: "FK_RaceResults_HorseInfo_HorseName_HorseBirthday",
                        columns: x => new { x.HorseName, x.HorseBirthday },
                        principalTable: "HorseInfo",
                        principalColumns: new[] { "HorseName", "Birthday" },
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "RaceInfo",
                columns: table => new
                {
                    CountOfDay = table.Column<string>(nullable: false),
                    RaceName = table.Column<string>(nullable: false),
                    Date = table.Column<DateTime>(nullable: false),
                    ShippingTime = table.Column<string>(nullable: true),
                    Weather = table.Column<string>(nullable: true),
                    Baba = table.Column<string>(nullable: true),
                    BabaState = table.Column<string>(nullable: true),
                    OldClass = table.Column<string>(nullable: true),
                    Distance = table.Column<string>(nullable: true),
                    Around = table.Column<string>(nullable: true),
                    RefundID = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RaceInfo", x => new { x.CountOfDay, x.RaceName, x.Date });
                    table.ForeignKey(
                        name: "FK_RaceInfo_PayBack_RefundID",
                        column: x => x.RefundID,
                        principalTable: "PayBack",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PayBack_Fuku1HorseName_Fuku1Birthday",
                table: "PayBack",
                columns: new[] { "Fuku1HorseName", "Fuku1Birthday" });

            migrationBuilder.CreateIndex(
                name: "IX_PayBack_Fuku2HorseName_Fuku2Birthday",
                table: "PayBack",
                columns: new[] { "Fuku2HorseName", "Fuku2Birthday" });

            migrationBuilder.CreateIndex(
                name: "IX_PayBack_Fuku3HorseName_Fuku3Birthday",
                table: "PayBack",
                columns: new[] { "Fuku3HorseName", "Fuku3Birthday" });

            migrationBuilder.CreateIndex(
                name: "IX_PayBack_Sanfuku1HorseName_Sanfuku1Birthday",
                table: "PayBack",
                columns: new[] { "Sanfuku1HorseName", "Sanfuku1Birthday" });

            migrationBuilder.CreateIndex(
                name: "IX_PayBack_Sanfuku2HorseName_Sanfuku2Birthday",
                table: "PayBack",
                columns: new[] { "Sanfuku2HorseName", "Sanfuku2Birthday" });

            migrationBuilder.CreateIndex(
                name: "IX_PayBack_Sanfuku3HorseName_Sanfuku3Birthday",
                table: "PayBack",
                columns: new[] { "Sanfuku3HorseName", "Sanfuku3Birthday" });

            migrationBuilder.CreateIndex(
                name: "IX_PayBack_Santan1HorseName_Santan1Birthday",
                table: "PayBack",
                columns: new[] { "Santan1HorseName", "Santan1Birthday" });

            migrationBuilder.CreateIndex(
                name: "IX_PayBack_Santan2HorseName_Santan2Birthday",
                table: "PayBack",
                columns: new[] { "Santan2HorseName", "Santan2Birthday" });

            migrationBuilder.CreateIndex(
                name: "IX_PayBack_Santan3HorseName_Santan3Birthday",
                table: "PayBack",
                columns: new[] { "Santan3HorseName", "Santan3Birthday" });

            migrationBuilder.CreateIndex(
                name: "IX_PayBack_TanshoHorseName_TanshoBirthday",
                table: "PayBack",
                columns: new[] { "TanshoHorseName", "TanshoBirthday" });

            migrationBuilder.CreateIndex(
                name: "IX_PayBack_Umaren1HorseName_Umaren1Birthday",
                table: "PayBack",
                columns: new[] { "Umaren1HorseName", "Umaren1Birthday" });

            migrationBuilder.CreateIndex(
                name: "IX_PayBack_Umaren2HorseName_Umaren2Birthday",
                table: "PayBack",
                columns: new[] { "Umaren2HorseName", "Umaren2Birthday" });

            migrationBuilder.CreateIndex(
                name: "IX_PayBack_Umatan1HorseName_Umatan1Birthday",
                table: "PayBack",
                columns: new[] { "Umatan1HorseName", "Umatan1Birthday" });

            migrationBuilder.CreateIndex(
                name: "IX_PayBack_Umatan2HorseName_Umatan2Birthday",
                table: "PayBack",
                columns: new[] { "Umatan2HorseName", "Umatan2Birthday" });

            migrationBuilder.CreateIndex(
                name: "IX_PayBack_Wakuren1HorseName_Wakuren1Birthday",
                table: "PayBack",
                columns: new[] { "Wakuren1HorseName", "Wakuren1Birthday" });

            migrationBuilder.CreateIndex(
                name: "IX_PayBack_Wakuren2HorseName_Wakuren2Birthday",
                table: "PayBack",
                columns: new[] { "Wakuren2HorseName", "Wakuren2Birthday" });

            migrationBuilder.CreateIndex(
                name: "IX_PayBack_Wide1_1HorseName_Wide1_1Birthday",
                table: "PayBack",
                columns: new[] { "Wide1_1HorseName", "Wide1_1Birthday" });

            migrationBuilder.CreateIndex(
                name: "IX_PayBack_Wide1_2HorseName_Wide1_2Birthday",
                table: "PayBack",
                columns: new[] { "Wide1_2HorseName", "Wide1_2Birthday" });

            migrationBuilder.CreateIndex(
                name: "IX_PayBack_Wide2_1HorseName_Wide2_1Birthday",
                table: "PayBack",
                columns: new[] { "Wide2_1HorseName", "Wide2_1Birthday" });

            migrationBuilder.CreateIndex(
                name: "IX_PayBack_Wide2_2HorseName_Wide2_2Birthday",
                table: "PayBack",
                columns: new[] { "Wide2_2HorseName", "Wide2_2Birthday" });

            migrationBuilder.CreateIndex(
                name: "IX_PayBack_Wide3_1HorseName_Wide3_1Birthday",
                table: "PayBack",
                columns: new[] { "Wide3_1HorseName", "Wide3_1Birthday" });

            migrationBuilder.CreateIndex(
                name: "IX_PayBack_Wide3_2HorseName_Wide3_2Birthday",
                table: "PayBack",
                columns: new[] { "Wide3_2HorseName", "Wide3_2Birthday" });

            migrationBuilder.CreateIndex(
                name: "IX_RaceInfo_RefundID",
                table: "RaceInfo",
                column: "RefundID");

            migrationBuilder.CreateIndex(
                name: "IX_RaceResults_HorseName_HorseBirthday",
                table: "RaceResults",
                columns: new[] { "HorseName", "HorseBirthday" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CnameTable");

            migrationBuilder.DropTable(
                name: "RaceInfo");

            migrationBuilder.DropTable(
                name: "RaceResults");

            migrationBuilder.DropTable(
                name: "PayBack");

            migrationBuilder.DropTable(
                name: "HorseInfo");
        }
    }
}
