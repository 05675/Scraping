using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Yayoi.Employees.Models
{
    /// <summary>
    /// 就業状況テーブル
    /// </summary>
    [Table("working_status")]
    public class WorkingStatus
    {
        /// <summary>
        /// 就業状況ID
        /// </summary>
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        [Column("working_status_id", TypeName = "int(4)")]
        public int WorkingStatusId { set; get; }

        /// <summary>
        /// 就業状況
        /// </summary>
        [Column("status", TypeName = "varchar(6)")]
        public string Status { set; get; }
    }
}
