using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Yayoi.Employees.Models
{
    /// <summary>
    /// 給与テーブル
    /// </summary>
    [Table("salary")]
    public class Salary
    {
        /// <summary>
        /// 給与ID
        /// </summary>
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("salary_id", TypeName = "int(4)")]
        public int SalaryId { set; get; }

        /// <summary>
        /// 従業員ID
        /// </summary>
        [Column("employee_id", TypeName = "int(6)")]
        public int EmployeeId { set; get; }

        /// <summary>
        /// 基本給
        /// </summary>
        [Column("base_salary", TypeName = "int(8)")]
        public int? BaseSalary { set; get; }

        /// <summary>
        /// 役職手当
        /// </summary>
        [Column("position_allowance", TypeName = "int(8)")]
        public int? PositionAllowance { set; get; }

        /// <summary>
        /// 家族手当
        /// </summary>
        [Column("family_allowance", TypeName = "int(8)")]
        public int? FamilyAllowance { set; get; }

        /// <summary>
        /// 住宅手当
        /// </summary>
        [Column("house_allowance", TypeName = "int(8)")]
        public int? HouseAllowance { set; get; }

        /// <summary>
        /// 役員報酬
        /// </summary>
        [Column("officer_reward", TypeName = "int(8)")]
        public int? OfficerReward { set; get; }

        /// <summary>
        /// EmployeeIdとの紐づけ
        /// </summary>
        [NotMapped]
        public Employee Employee { set; get; }
    }
}
