﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Yayoi.Employees.Models;

namespace Yayoi.Employees.Migrations
{
    [DbContext(typeof(EmployeeContext))]
    [Migration("20200417051855_InitialCreate")]
    partial class InitialCreate
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.3")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("Yayoi.Employees.Models.Address", b =>
                {
                    b.Property<int>("AddressId")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("address_id")
                        .HasColumnType("int(4)");

                    b.Property<string>("AddressDetail")
                        .HasColumnName("address_detail")
                        .HasColumnType("varchar(46)");

                    b.Property<int>("EmployeeId")
                        .HasColumnName("employee_id")
                        .HasColumnType("int(6)");

                    b.Property<string>("PostalCode")
                        .HasColumnName("postal_code")
                        .HasColumnType("varchar(8)");

                    b.Property<string>("TelephoneNumber")
                        .HasColumnName("telephone_number")
                        .HasColumnType("varchar(14)");

                    b.HasKey("AddressId");

                    b.ToTable("address");
                });

            modelBuilder.Entity("Yayoi.Employees.Models.CommutingExpense", b =>
                {
                    b.Property<int>("CommutingExpenseId")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("commuting_expense_id")
                        .HasColumnType("int(6)");

                    b.Property<int>("Amount")
                        .HasColumnName("amount")
                        .HasColumnType("int(8)");

                    b.Property<int>("EmployeeId")
                        .HasColumnName("employee_id")
                        .HasColumnType("int(4)");

                    b.Property<string>("PayPeriod")
                        .HasColumnName("pay_period")
                        .HasColumnType("varchar(6)");

                    b.Property<string>("PayWay")
                        .HasColumnName("pay_way")
                        .HasColumnType("varchar(6)");

                    b.HasKey("CommutingExpenseId");

                    b.ToTable("commuting_expense");
                });

            modelBuilder.Entity("Yayoi.Employees.Models.Department", b =>
                {
                    b.Property<int>("DepartmentId")
                        .HasColumnName("department_id")
                        .HasColumnType("int(4)");

                    b.Property<string>("DepartmentName")
                        .HasColumnName("department_name")
                        .HasColumnType("varchar(6)");

                    b.HasKey("DepartmentId");

                    b.ToTable("department");

                    b.HasData(
                        new
                        {
                            DepartmentId = 0,
                            DepartmentName = "開発部"
                        },
                        new
                        {
                            DepartmentId = 1,
                            DepartmentName = "営業部"
                        });
                });

            modelBuilder.Entity("Yayoi.Employees.Models.Employee", b =>
                {
                    b.Property<int?>("EmployeeId")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("employee_id")
                        .HasColumnType("int(6)");

                    b.Property<DateTime?>("BirthDay")
                        .HasColumnName("birth_day")
                        .HasColumnType("date");

                    b.Property<int?>("DepartmentId")
                        .HasColumnName("department_id")
                        .HasColumnType("int(4)");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnName("first_name")
                        .HasColumnType("varchar(10)");

                    b.Property<int?>("GenderId")
                        .HasColumnName("gender_id")
                        .HasColumnType("int(1)");

                    b.Property<DateTime?>("HireDay")
                        .HasColumnName("hire_day")
                        .HasColumnType("date");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnName("last_name")
                        .HasColumnType("varchar(10)");

                    b.Property<int?>("PositionId")
                        .HasColumnName("position_id")
                        .HasColumnType("int(4)");

                    b.Property<int?>("TaxId")
                        .HasColumnName("tax_id")
                        .HasColumnType("int(4)");

                    b.Property<int?>("WorkingStatusId")
                        .HasColumnName("working_status_id")
                        .HasColumnType("int(4)");

                    b.HasKey("EmployeeId");

                    b.HasIndex("DepartmentId");

                    b.HasIndex("GenderId");

                    b.HasIndex("PositionId");

                    b.HasIndex("TaxId");

                    b.HasIndex("WorkingStatusId");

                    b.ToTable("employee");

                    b.HasData(
                        new
                        {
                            EmployeeId = 1,
                            BirthDay = new DateTime(1995, 3, 31, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            DepartmentId = 0,
                            FirstName = "太郎",
                            GenderId = 0,
                            HireDay = new DateTime(2018, 4, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            LastName = "弥生",
                            PositionId = 0,
                            TaxId = 0,
                            WorkingStatusId = 0
                        },
                        new
                        {
                            EmployeeId = 2,
                            BirthDay = new DateTime(1995, 4, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            DepartmentId = 1,
                            FirstName = "花子",
                            GenderId = 1,
                            HireDay = new DateTime(2018, 4, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            LastName = "卯月",
                            PositionId = 1,
                            TaxId = 1,
                            WorkingStatusId = 1
                        });
                });

            modelBuilder.Entity("Yayoi.Employees.Models.Gender", b =>
                {
                    b.Property<int>("GenderId")
                        .HasColumnName("gender_id")
                        .HasColumnType("int(1)");

                    b.Property<string>("GenderValue")
                        .HasColumnName("gender_value")
                        .HasColumnType("varchar(2)");

                    b.HasKey("GenderId");

                    b.ToTable("gender");

                    b.HasData(
                        new
                        {
                            GenderId = 0,
                            GenderValue = "男"
                        },
                        new
                        {
                            GenderId = 1,
                            GenderValue = "女"
                        });
                });

            modelBuilder.Entity("Yayoi.Employees.Models.Position", b =>
                {
                    b.Property<int>("PositionId")
                        .HasColumnName("position_id")
                        .HasColumnType("int(4)");

                    b.Property<string>("PositionName")
                        .HasColumnName("position_name")
                        .HasColumnType("varchar(6)");

                    b.HasKey("PositionId");

                    b.ToTable("position");

                    b.HasData(
                        new
                        {
                            PositionId = 0,
                            PositionName = "主任"
                        },
                        new
                        {
                            PositionId = 1,
                            PositionName = "部長"
                        },
                        new
                        {
                            PositionId = 2,
                            PositionName = "代表取締役"
                        });
                });

            modelBuilder.Entity("Yayoi.Employees.Models.Salary", b =>
                {
                    b.Property<int>("SalaryId")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("salary_id")
                        .HasColumnType("int(4)");

                    b.Property<int?>("BaseSalary")
                        .HasColumnName("base_salary")
                        .HasColumnType("int(8)");

                    b.Property<int>("EmployeeId")
                        .HasColumnName("employee_id")
                        .HasColumnType("int(6)");

                    b.Property<int?>("FamilyAllowance")
                        .HasColumnName("family_allowance")
                        .HasColumnType("int(8)");

                    b.Property<int?>("HouseAllowance")
                        .HasColumnName("house_allowance")
                        .HasColumnType("int(8)");

                    b.Property<int?>("OfficerReward")
                        .HasColumnName("officer_reward")
                        .HasColumnType("int(8)");

                    b.Property<int?>("PositionAllowance")
                        .HasColumnName("position_allowance")
                        .HasColumnType("int(8)");

                    b.HasKey("SalaryId");

                    b.ToTable("salary");
                });

            modelBuilder.Entity("Yayoi.Employees.Models.Tax", b =>
                {
                    b.Property<int>("TaxId")
                        .HasColumnName("tax_id")
                        .HasColumnType("int(1)");

                    b.Property<string>("TaxKind")
                        .HasColumnName("tax_kind")
                        .HasColumnType("varchar(2)");

                    b.HasKey("TaxId");

                    b.ToTable("tax");

                    b.HasData(
                        new
                        {
                            TaxId = 0,
                            TaxKind = "甲"
                        },
                        new
                        {
                            TaxId = 1,
                            TaxKind = "乙"
                        });
                });

            modelBuilder.Entity("Yayoi.Employees.Models.WorkingStatus", b =>
                {
                    b.Property<int>("WorkingStatusId")
                        .HasColumnName("working_status_id")
                        .HasColumnType("int(4)");

                    b.Property<string>("Status")
                        .HasColumnName("status")
                        .HasColumnType("varchar(6)");

                    b.HasKey("WorkingStatusId");

                    b.ToTable("working_status");

                    b.HasData(
                        new
                        {
                            WorkingStatusId = 0,
                            Status = "就業"
                        },
                        new
                        {
                            WorkingStatusId = 1,
                            Status = "休業"
                        },
                        new
                        {
                            WorkingStatusId = 2,
                            Status = "退職"
                        });
                });

            modelBuilder.Entity("Yayoi.Employees.Models.Employee", b =>
                {
                    b.HasOne("Yayoi.Employees.Models.Department", "Department")
                        .WithMany()
                        .HasForeignKey("DepartmentId");

                    b.HasOne("Yayoi.Employees.Models.Gender", "Gender")
                        .WithMany()
                        .HasForeignKey("GenderId");

                    b.HasOne("Yayoi.Employees.Models.Position", "Position")
                        .WithMany()
                        .HasForeignKey("PositionId");

                    b.HasOne("Yayoi.Employees.Models.Tax", "Tax")
                        .WithMany()
                        .HasForeignKey("TaxId");

                    b.HasOne("Yayoi.Employees.Models.WorkingStatus", "WorkingStatus")
                        .WithMany()
                        .HasForeignKey("WorkingStatusId");
                });
#pragma warning restore 612, 618
        }
    }
}