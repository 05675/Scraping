using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Yayoi.Employees.Models
{
    /// <summary>
    /// 通勤費テーブル
    /// </summary>
    [Table("commuting_expense")]
    public class CommutingExpense
    {
        /// <summary>
        /// 通勤費ID
        /// </summary>
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("commuting_expense_id", TypeName = "int(6)")]
        public int CommutingExpenseId { set; get; }

        /// <summary>
        /// 従業員ID
        /// </summary>
        [Column("employee_id", TypeName = "int(4)")]
        public int EmployeeId { set; get; }

        /// <summary>
        /// 通勤費の支払期間
        /// </summary>
        [Column("pay_period", TypeName = "varchar(6)")]
        public string PayPeriod { set; get; }

        /// <summary>
        /// 通勤費の支払い方法
        /// </summary>
        [Column("pay_way", TypeName = "varchar(6)")]
        public string PayWay { set; get; }

        /// <summary>
        /// 通勤費総額
        /// </summary>
        [Column("amount", TypeName = "int(8)")]
        public int Amount { set; get; }

        /// <summary>
        /// EmployeeIdとの紐づけ
        /// </summary>
        [NotMapped]
        public Employee Employee { set; get; }
    }
}
