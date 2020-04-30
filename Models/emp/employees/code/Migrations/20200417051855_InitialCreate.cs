using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Yayoi.Employees.Migrations
{
    public partial class InitialCreate: Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "address",
                columns: table => new
                {
                    address_id = table.Column<int>(type: "int(4)", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    employee_id = table.Column<int>(type: "int(6)", nullable: false),
                    telephone_number = table.Column<string>(type: "varchar(14)", nullable: true),
                    postal_code = table.Column<string>(type: "varchar(8)", nullable: true),
                    address_detail = table.Column<string>(type: "varchar(46)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_address", x => x.address_id);
                });

            migrationBuilder.CreateTable(
                name: "commuting_expense",
                columns: table => new
                {
                    commuting_expense_id = table.Column<int>(type: "int(6)", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    employee_id = table.Column<int>(type: "int(4)", nullable: false),
                    pay_period = table.Column<string>(type: "varchar(6)", nullable: true),
                    pay_way = table.Column<string>(type: "varchar(6)", nullable: true),
                    amount = table.Column<int>(type: "int(8)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_commuting_expense", x => x.commuting_expense_id);
                });

            migrationBuilder.CreateTable(
                name: "department",
                columns: table => new
                {
                    department_id = table.Column<int>(type: "int(4)", nullable: false),
                    department_name = table.Column<string>(type: "varchar(6)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_department", x => x.department_id);
                });

            migrationBuilder.CreateTable(
                name: "gender",
                columns: table => new
                {
                    gender_id = table.Column<int>(type: "int(1)", nullable: false),
                    gender_value = table.Column<string>(type: "varchar(2)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_gender", x => x.gender_id);
                });

            migrationBuilder.CreateTable(
                name: "position",
                columns: table => new
                {
                    position_id = table.Column<int>(type: "int(4)", nullable: false),
                    position_name = table.Column<string>(type: "varchar(6)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_position", x => x.position_id);
                });

            migrationBuilder.CreateTable(
                name: "salary",
                columns: table => new
                {
                    salary_id = table.Column<int>(type: "int(4)", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    employee_id = table.Column<int>(type: "int(6)", nullable: false),
                    base_salary = table.Column<int>(type: "int(8)", nullable: true),
                    position_allowance = table.Column<int>(type: "int(8)", nullable: true),
                    family_allowance = table.Column<int>(type: "int(8)", nullable: true),
                    house_allowance = table.Column<int>(type: "int(8)", nullable: true),
                    officer_reward = table.Column<int>(type: "int(8)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_salary", x => x.salary_id);
                });

            migrationBuilder.CreateTable(
                name: "tax",
                columns: table => new
                {
                    tax_id = table.Column<int>(type: "int(1)", nullable: false),
                    tax_kind = table.Column<string>(type: "varchar(2)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tax", x => x.tax_id);
                });

            migrationBuilder.CreateTable(
                name: "working_status",
                columns: table => new
                {
                    working_status_id = table.Column<int>(type: "int(4)", nullable: false),
                    status = table.Column<string>(type: "varchar(6)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_working_status", x => x.working_status_id);
                });

            migrationBuilder.CreateTable(
                name: "employee",
                columns: table => new
                {
                    employee_id = table.Column<int>(type: "int(6)", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    last_name = table.Column<string>(type: "varchar(10)", nullable: false),
                    first_name = table.Column<string>(type: "varchar(10)", nullable: false),
                    birth_day = table.Column<DateTime>(type: "date", nullable: true),
                    hire_day = table.Column<DateTime>(type: "date", nullable: true),
                    gender_id = table.Column<int>(type: "int(1)", nullable: true),
                    department_id = table.Column<int>(type: "int(4)", nullable: true),
                    tax_id = table.Column<int>(type: "int(4)", nullable: true),
                    working_status_id = table.Column<int>(type: "int(4)", nullable: true),
                    position_id = table.Column<int>(type: "int(4)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_employee", x => x.employee_id);
                    table.ForeignKey(
                        name: "FK_employee_department_department_id",
                        column: x => x.department_id,
                        principalTable: "department",
                        principalColumn: "department_id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_employee_gender_gender_id",
                        column: x => x.gender_id,
                        principalTable: "gender",
                        principalColumn: "gender_id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_employee_position_position_id",
                        column: x => x.position_id,
                        principalTable: "position",
                        principalColumn: "position_id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_employee_tax_tax_id",
                        column: x => x.tax_id,
                        principalTable: "tax",
                        principalColumn: "tax_id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_employee_working_status_working_status_id",
                        column: x => x.working_status_id,
                        principalTable: "working_status",
                        principalColumn: "working_status_id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.InsertData(
                table: "department",
                columns: new[] { "department_id", "department_name" },
                values: new object[,]
                {
                    { 0, "開発部" },
                    { 1, "営業部" }
                });

            migrationBuilder.InsertData(
                table: "gender",
                columns: new[] { "gender_id", "gender_value" },
                values: new object[,]
                {
                    { 0, "男" },
                    { 1, "女" }
                });

            migrationBuilder.InsertData(
                table: "position",
                columns: new[] { "position_id", "position_name" },
                values: new object[,]
                {
                    { 0, "主任" },
                    { 1, "部長" },
                    { 2, "代表取締役" }
                });

            migrationBuilder.InsertData(
                table: "tax",
                columns: new[] { "tax_id", "tax_kind" },
                values: new object[,]
                {
                    { 0, "甲" },
                    { 1, "乙" }
                });

            migrationBuilder.InsertData(
                table: "working_status",
                columns: new[] { "working_status_id", "status" },
                values: new object[,]
                {
                    { 0, "就業" },
                    { 1, "休業" },
                    { 2, "退職" }
                });

            migrationBuilder.InsertData(
                table: "employee",
                columns: new[] { "employee_id", "birth_day", "department_id", "first_name", "gender_id", "hire_day", "last_name", "position_id", "tax_id", "working_status_id" },
                values: new object[] { 1, new DateTime(1995, 3, 31, 0, 0, 0, 0, DateTimeKind.Unspecified), 0, "太郎", 0, new DateTime(2018, 4, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "弥生", 0, 0, 0 });

            migrationBuilder.InsertData(
                table: "employee",
                columns: new[] { "employee_id", "birth_day", "department_id", "first_name", "gender_id", "hire_day", "last_name", "position_id", "tax_id", "working_status_id" },
                values: new object[] { 2, new DateTime(1995, 4, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, "花子", 1, new DateTime(2018, 4, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "卯月", 1, 1, 1 });

            migrationBuilder.CreateIndex(
                name: "IX_employee_department_id",
                table: "employee",
                column: "department_id");

            migrationBuilder.CreateIndex(
                name: "IX_employee_gender_id",
                table: "employee",
                column: "gender_id");

            migrationBuilder.CreateIndex(
                name: "IX_employee_position_id",
                table: "employee",
                column: "position_id");

            migrationBuilder.CreateIndex(
                name: "IX_employee_tax_id",
                table: "employee",
                column: "tax_id");

            migrationBuilder.CreateIndex(
                name: "IX_employee_working_status_id",
                table: "employee",
                column: "working_status_id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "address");

            migrationBuilder.DropTable(
                name: "commuting_expense");

            migrationBuilder.DropTable(
                name: "employee");

            migrationBuilder.DropTable(
                name: "salary");

            migrationBuilder.DropTable(
                name: "department");

            migrationBuilder.DropTable(
                name: "gender");

            migrationBuilder.DropTable(
                name: "position");

            migrationBuilder.DropTable(
                name: "tax");

            migrationBuilder.DropTable(
                name: "working_status");
        }
    }
}
