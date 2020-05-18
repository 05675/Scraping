using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Yayoi.Employees.Models
{
    public class EmployeeContext: DbContext
    {
        /// <summary>
        /// 従業員情報テーブル
        /// </summary>
        public DbSet<Employee> Employees { set; get; }

        /// <summary>
        /// 給与テーブル
        /// </summary>
        public DbSet<Salary> Salaries { set; get; }

        /// <summary>
        /// 通勤費テーブル
        /// </summary>
        public DbSet<CommutingExpense> CommutingExpenses { set; get; }

        /// <summary>
        /// 住所テーブル
        /// </summary>
        public DbSet<Address> Addresses { set; get; }

        public EmployeeContext(DbContextOptions<EmployeeContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // データベースのシード
            modelBuilder.Entity<Gender>().HasData(
                new { GenderId = 0, GenderValue = "男" },
                new { GenderId = 1, GenderValue = "女" });

            modelBuilder.Entity<Position>().HasData(
                new { PositionId = 0, PositionName = "主任" },
                new { PositionId = 1, PositionName = "部長" },
                new { PositionId = 2, PositionName = "代表取締役" });

            modelBuilder.Entity<Department>().HasData(
                new { DepartmentId = 0, DepartmentName = "開発部" },
                new { DepartmentId = 1, DepartmentName = "営業部" });

            modelBuilder.Entity<Tax>().HasData(
                new { TaxId = 0, TaxKind = "甲" },
                new { TaxId = 1, TaxKind = "乙" });

            modelBuilder.Entity<WorkingStatus>().HasData(
                new { WorkingStatusId = 0, Status = "就業" },
                new { WorkingStatusId = 1, Status = "休業" },
                new { WorkingStatusId = 2, Status = "退職" });

            modelBuilder.Entity<Employee>().HasData(
                new
                {
                    EmployeeId = 1,
                    LastName = "弥生",
                    FirstName = "太郎",
                    BirthDay = new DateTime(1995, 3, 31),
                    HireDay = new DateTime(2018, 4, 1),
                    GenderId = 0,
                    DepartmentId = 0,
                    TaxId = 0,
                    WorkingStatusId = 0,
                    PositionId = 0
                },
                new
                {
                    EmployeeId = 2,
                    LastName = "卯月",
                    FirstName = "花子",
                    BirthDay = new DateTime(1995, 4, 1),
                    HireDay = new DateTime(2018, 4, 1),
                    GenderId = 1,
                    DepartmentId = 1,
                    TaxId = 1,
                    WorkingStatusId = 1,
                    PositionId = 1
                });

            //Fulent APIのための設定
            modelBuilder.Entity<Employee>().HasOne(emp => emp.Gender);
            modelBuilder.Entity<Employee>().HasOne(emp => emp.Department);
            modelBuilder.Entity<Employee>().HasOne(emp => emp.Tax);
            modelBuilder.Entity<Employee>().HasOne(emp => emp.WorkingStatus);
            modelBuilder.Entity<Employee>().HasOne(emp => emp.Position);
        }
    }

    /// <summary>
    /// 従業員情報テーブル
    /// </summary>
    [Table("employee")]
    public class Employee
    {
        /// <summary>
        /// 従業員ID
        /// </summary>
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("employee_id", TypeName = "int(6)")]
        public int? EmployeeId { set; get; }

        /// <summary>
        /// 従業員姓
        /// </summary>
        [Required]
        [Column("last_name", TypeName = "varchar(10)")]
        public string LastName { set; get; }

        /// <summary>
        /// 従業員名
        /// </summary>
        [Required]
        [Column("first_name", TypeName = "varchar(10)")]
        public string FirstName { set; get; }


        /// <summary>
        /// 生年月日
        /// </summary>
        [Column("birth_day", TypeName = "date")]
        public DateTime? BirthDay { set; get; }

        /// <summary>
        /// 入社年月日
        /// </summary>
        [Column("hire_day", TypeName = "date")]
        public DateTime? HireDay { set; get; }

        /// <summary>
        /// 性別ID
        /// </summary>
        [Column("gender_id", TypeName = "int(1)")]
        public int? GenderId { set; get; }

        /// <summary>
        /// 所属部門ID
        /// </summary>
        [Column("department_id", TypeName = "int(4)")]
        public int? DepartmentId { set; get; }


        /// <summary>
        /// 税額表ID
        /// </summary>
        [Column("tax_id", TypeName = "int(4)")]
        public int? TaxId { set; get; }

        /// <summary>
        /// 就業状況ID
        /// </summary>
        [Column("working_status_id", TypeName = "int(4)")]
        public int? WorkingStatusId { set; get; }

        /// <summary>
        /// 役職ID
        /// </summary>
        [Column("position_id", TypeName = "int(4)")]
        public int? PositionId { set; get; }

        #region 外部キーで別テーブルに接続するためのプロパティ

        /// <summary>
        /// GenderIdとの紐づけ
        /// </summary>
        [NotMapped]
        public Gender Gender { set; get; }

        /// <summary>
        /// DepartmentIdとの紐づけ
        /// </summary>
        [NotMapped]
        public Department Department { set; get; }

        /// <summary>
        /// TaxIdとの紐づけ
        /// </summary>
        [NotMapped]
        public Tax Tax { set; get; }

        /// <summary>
        /// WorkingStatusIdとの紐づけ
        /// </summary>
        [NotMapped]
        public WorkingStatus WorkingStatus { set; get; }

        /// <summary>
        /// PositionIdとの紐づけ
        /// </summary>
        [NotMapped]
        public Position Position { set; get; }

        #endregion

    }
}
